class Temperature {
    constructor(celsius) {
        this.celsius = celsius >= -273 ? celsius : -273;
    }
    toFahrenheit() {
        return (this.celsius * 9) / 5 + 32;
    }
    toKelvin() {
        return this.celsius + 273.15;
    }
}