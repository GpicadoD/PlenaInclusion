// Generated by CoffeeScript 1.12.7
(function() {
  var GenericReceiver, MAP, ResponseReceiver, Session, SockJSConnection, Transport, closeFrame, register, stream, utils, uuidv4,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  stream = require('stream');

  uuidv4 = require('uuid').v4;

  utils = require('./utils');

  Transport = (function() {
    function Transport() {}

    return Transport;

  })();

  Transport.CONNECTING = 0;

  Transport.OPEN = 1;

  Transport.CLOSING = 2;

  Transport.CLOSED = 3;

  closeFrame = function(status, reason) {
    return 'c' + JSON.stringify([status, reason]);
  };

  SockJSConnection = (function(superClass) {
    extend(SockJSConnection, superClass);

    function SockJSConnection(_session) {
      this._session = _session;
      this.id = uuidv4();
      this.headers = {};
      this.prefix = this._session.prefix;
    }

    SockJSConnection.prototype.toString = function() {
      return '<SockJSConnection ' + this.id + '>';
    };

    SockJSConnection.prototype.write = function(string) {
      return this._session.send('' + string);
    };

    SockJSConnection.prototype.end = function(string) {
      if (string) {
        this.write(string);
      }
      this.close();
      return null;
    };

    SockJSConnection.prototype.close = function(code, reason) {
      return this._session.close(code, reason);
    };

    SockJSConnection.prototype.destroy = function() {
      this.end();
      return this.removeAllListeners();
    };

    SockJSConnection.prototype.destroySoon = function() {
      return this.destroy();
    };

    return SockJSConnection;

  })(stream.Stream);

  SockJSConnection.prototype.__defineGetter__('readable', function() {
    return this._session.readyState === Transport.OPEN;
  });

  SockJSConnection.prototype.__defineGetter__('writable', function() {
    return this._session.readyState === Transport.OPEN;
  });

  SockJSConnection.prototype.__defineGetter__('readyState', function() {
    return this._session.readyState;
  });

  MAP = {};

  Session = (function() {
    function Session(session_id1, server) {
      this.session_id = session_id1;
      this.heartbeat_delay = server.options.heartbeat_delay;
      this.disconnect_delay = server.options.disconnect_delay;
      this.prefix = server.options.prefix;
      this.send_buffer = [];
      this.is_closing = false;
      this.readyState = Transport.CONNECTING;
      if (this.session_id) {
        MAP[this.session_id] = this;
      }
      this.timeout_cb = (function(_this) {
        return function() {
          return _this.didTimeout();
        };
      })(this);
      this.to_tref = setTimeout(this.timeout_cb, this.disconnect_delay);
      this.connection = new SockJSConnection(this);
      this.emit_open = (function(_this) {
        return function() {
          _this.emit_open = null;
          return server.emit('connection', _this.connection);
        };
      })(this);
    }

    Session.prototype.register = function(req, recv) {
      if (this.recv) {
        recv.doSendFrame(closeFrame(2010, "Another connection still open"));
        recv.didClose();
        return;
      }
      if (this.to_tref) {
        clearTimeout(this.to_tref);
        this.to_tref = null;
      }
      if (this.readyState === Transport.CLOSING) {
        this.flushToRecv(recv);
        recv.doSendFrame(this.close_frame);
        recv.didClose();
        this.to_tref = setTimeout(this.timeout_cb, this.disconnect_delay);
        return;
      }
      this.recv = recv;
      this.recv.session = this;
      this.decorateConnection(req);
      if (this.readyState === Transport.CONNECTING) {
        this.recv.doSendFrame('o');
        this.readyState = Transport.OPEN;
        process.nextTick(this.emit_open);
      }
      if (!this.recv) {
        return;
      }
      this.tryFlush();
    };

    Session.prototype.decorateConnection = function(req) {
      var address, headers, i, key, len, ref, remoteAddress, remotePort, socket, x;
      if (!(socket = this.recv.connection)) {
        socket = this.recv.response.connection;
      }
      try {
        remoteAddress = socket.remoteAddress;
        remotePort = socket.remotePort;
        address = socket.address();
      } catch (error) {
        x = error;
      }
      if (remoteAddress) {
        this.connection.remoteAddress = remoteAddress;
        this.connection.remotePort = remotePort;
        this.connection.address = address;
      }
      this.connection.url = req.url;
      this.connection.pathname = req.pathname;
      this.connection.protocol = this.recv.protocol;
      headers = {};
      ref = ['referer', 'x-client-ip', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-port', 'x-cluster-client-ip', 'via', 'x-real-ip', 'x-forwarded-proto', 'x-ssl', 'dnt', 'host', 'user-agent', 'accept-language'];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        if (req.headers[key]) {
          headers[key] = req.headers[key];
        }
      }
      if (headers) {
        return this.connection.headers = headers;
      }
    };

    Session.prototype.unregister = function() {
      var delay;
      delay = this.recv.delay_disconnect;
      this.recv.session = null;
      this.recv = null;
      if (this.to_tref) {
        clearTimeout(this.to_tref);
      }
      if (delay) {
        return this.to_tref = setTimeout(this.timeout_cb, this.disconnect_delay);
      } else {
        return this.timeout_cb();
      }
    };

    Session.prototype.flushToRecv = function(recv) {
      var ref, sb;
      if (this.send_buffer.length > 0) {
        ref = [this.send_buffer, []], sb = ref[0], this.send_buffer = ref[1];
        recv.doSendBulk(sb);
        return true;
      }
      return false;
    };

    Session.prototype.tryFlush = function() {
      var x;
      if (!this.flushToRecv(this.recv) || !this.to_tref) {
        if (this.to_tref) {
          clearTimeout(this.to_tref);
        }
        x = (function(_this) {
          return function() {
            if (_this.recv) {
              _this.to_tref = setTimeout(x, _this.heartbeat_delay);
              return _this.recv.heartbeat();
            }
          };
        })(this);
        this.to_tref = setTimeout(x, this.heartbeat_delay);
      }
    };

    Session.prototype.didTimeout = function() {
      if (this.to_tref) {
        clearTimeout(this.to_tref);
        this.to_tref = null;
      }
      if (this.readyState !== Transport.CONNECTING && this.readyState !== Transport.OPEN && this.readyState !== Transport.CLOSING) {
        throw Error('INVALID_STATE_ERR');
      }
      if (this.recv) {
        throw Error('RECV_STILL_THERE');
      }
      this.readyState = Transport.CLOSED;
      this.connection.emit('end');
      this.connection.emit('close');
      this.connection = null;
      if (this.session_id) {
        delete MAP[this.session_id];
        return this.session_id = null;
      }
    };

    Session.prototype.didMessage = function(payload) {
      if (this.readyState === Transport.OPEN) {
        this.connection.emit('data', payload);
      }
    };

    Session.prototype.send = function(payload) {
      if (this.readyState !== Transport.OPEN) {
        return false;
      }
      this.send_buffer.push('' + payload);
      if (this.recv) {
        this.tryFlush();
      }
      return true;
    };

    Session.prototype.close = function(status, reason) {
      if (status == null) {
        status = 1000;
      }
      if (reason == null) {
        reason = "Normal closure";
      }
      if (this.readyState !== Transport.OPEN) {
        return false;
      }
      this.readyState = Transport.CLOSING;
      this.close_frame = closeFrame(status, reason);
      if (this.recv) {
        this.recv.doSendFrame(this.close_frame);
        if (this.recv) {
          this.recv.didClose();
        }
        if (this.recv) {
          this.unregister();
        }
      }
      return true;
    };

    return Session;

  })();

  Session.bySessionId = function(session_id) {
    if (!session_id) {
      return null;
    }
    return MAP[session_id] || null;
  };

  register = function(req, server, session_id, receiver) {
    var session;
    session = Session.bySessionId(session_id);
    if (!session) {
      session = new Session(session_id, server);
    }
    session.register(req, receiver);
    return session;
  };

  exports.register = function(req, server, receiver) {
    return register(req, server, req.session, receiver);
  };

  exports.registerNoSession = function(req, server, receiver) {
    return register(req, server, void 0, receiver);
  };

  GenericReceiver = (function() {
    function GenericReceiver(thingy) {
      this.thingy = thingy;
      this.setUp(this.thingy);
    }

    GenericReceiver.prototype.setUp = function() {
      this.thingy_end_cb = (function(_this) {
        return function() {
          return _this.didAbort();
        };
      })(this);
      this.thingy.addListener('close', this.thingy_end_cb);
      return this.thingy.addListener('end', this.thingy_end_cb);
    };

    GenericReceiver.prototype.tearDown = function() {
      this.thingy.removeListener('close', this.thingy_end_cb);
      this.thingy.removeListener('end', this.thingy_end_cb);
      return this.thingy_end_cb = null;
    };

    GenericReceiver.prototype.didAbort = function() {
      this.delay_disconnect = false;
      return this.didClose();
    };

    GenericReceiver.prototype.didClose = function() {
      if (this.thingy) {
        this.tearDown(this.thingy);
        this.thingy = null;
      }
      if (this.session) {
        return this.session.unregister();
      }
    };

    GenericReceiver.prototype.doSendBulk = function(messages) {
      var m, q_msgs;
      q_msgs = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = messages.length; i < len; i++) {
          m = messages[i];
          results.push(utils.quote(m));
        }
        return results;
      })();
      return this.doSendFrame('a' + '[' + q_msgs.join(',') + ']');
    };

    GenericReceiver.prototype.heartbeat = function() {
      return this.doSendFrame('h');
    };

    return GenericReceiver;

  })();

  ResponseReceiver = (function(superClass) {
    extend(ResponseReceiver, superClass);

    ResponseReceiver.prototype.max_response_size = void 0;

    ResponseReceiver.prototype.delay_disconnect = true;

    function ResponseReceiver(request, response, options) {
      var x;
      this.request = request;
      this.response = response;
      this.options = options;
      this.curr_response_size = 0;
      try {
        this.request.connection.setKeepAlive(true, 5000);
      } catch (error) {
        x = error;
      }
      ResponseReceiver.__super__.constructor.call(this, this.request.connection);
      if (this.max_response_size === void 0) {
        this.max_response_size = this.options.response_limit;
      }
    }

    ResponseReceiver.prototype.doSendFrame = function(payload) {
      var r, x;
      this.curr_response_size += payload.length;
      r = false;
      try {
        this.response.write(payload);
        r = true;
      } catch (error) {
        x = error;
      }
      if (this.max_response_size && this.curr_response_size >= this.max_response_size) {
        this.didClose();
      }
      return r;
    };

    ResponseReceiver.prototype.didClose = function() {
      var x;
      ResponseReceiver.__super__.didClose.apply(this, arguments);
      try {
        this.response.end();
      } catch (error) {
        x = error;
      }
      return this.response = null;
    };

    return ResponseReceiver;

  })(GenericReceiver);

  exports.GenericReceiver = GenericReceiver;

  exports.Transport = Transport;

  exports.Session = Session;

  exports.ResponseReceiver = ResponseReceiver;

  exports.SockJSConnection = SockJSConnection;

}).call(this);
