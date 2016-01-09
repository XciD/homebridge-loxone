var Service, Characteristic;

function LoxoneHumidity(config, platform, hap) {
    this.log = platform.log;
    this.type = "HumiditySensor";
    this.platform = platform;
    this.loxone = platform.loxone;

    Service = hap.Service;
    Characteristic = hap.Characteristic;

    this.name = config.name;
    this.input = config.input;

    this._service = new Service.HumiditySensor(this.name);
    this._service.getCharacteristic(Characteristic.CurrentRelativeHumidity)
        .on('get', this._getValue.bind(this));
}

LoxoneHumidity.prototype._getValue = function(callback) {
    this.loxone.getValue(this.input, function(value) {
        callback(null, value * 1);
    });
};

LoxoneHumidity.prototype.getServices = function() {
    return [this._service, this.platform.getInformationService(this)];
};

module.exports = LoxoneHumidity;