"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfMeasure = exports.Location = exports.Phase = exports.Measurand = exports.ValueFormat = exports.ReadingContext = exports.SampledValue = void 0;
class SampledValue {
}
exports.SampledValue = SampledValue;
var ReadingContext;
(function (ReadingContext) {
    ReadingContext["InterruptionBegin"] = "Interruption.Begin";
    ReadingContext["InterruptionEnd"] = "Interruption.End";
    ReadingContext["SampleClock"] = "Sample.Clock";
    ReadingContext["SamplePeriodic"] = "Sample.Periodic";
    ReadingContext["TransactionBegin"] = "Transaction.Begin";
    ReadingContext["TransactionEnd"] = "Transaction.End";
    ReadingContext["Trigger"] = "Trigger";
    ReadingContext["Other"] = "Other";
})(ReadingContext = exports.ReadingContext || (exports.ReadingContext = {}));
var ValueFormat;
(function (ValueFormat) {
    ValueFormat["Raw"] = "Raw";
    ValueFormat["SignedData"] = "SignedData";
})(ValueFormat = exports.ValueFormat || (exports.ValueFormat = {}));
var Measurand;
(function (Measurand) {
    Measurand["EnergyActiveExportRegister"] = "Energy.Active.Export.Register";
    Measurand["EnergyActiveImportRegister"] = "Energy.Active.Import.Register";
    Measurand["EnergyReactiveExportRegister"] = "Energy.Reactive.Export.Register";
    Measurand["EnergyReactiveImportRegister"] = "Energy.Reactive.Import.Register";
    Measurand["EnergyActiveExportInterval"] = "Energy.Active.Export.Interval";
    Measurand["EnergyActiveImportInterval"] = "Energy.Active.Import.Interval";
    Measurand["EnergyReactiveExportInterval"] = "Energy.Reactive.Export.Interval";
    Measurand["EnergyReactiveImportInterval"] = "Energy.Reactive.Import.Interval";
    Measurand["PowerActiveExport"] = "Power.Active.Export";
    Measurand["PowerActiveImport"] = "Power.Active.Import";
    Measurand["PowerOffered"] = "Power.Offered";
    Measurand["PowerReactiveExport"] = "Power.Reactive.Export";
    Measurand["PowerReactiveImport"] = "Power.Reactive.Import";
    Measurand["PowerFactor"] = "Power.Factor";
    Measurand["CurrentImport"] = "Current.Import";
    Measurand["CurrentExport"] = "Current.Export";
    Measurand["CurrentOffered"] = "Current.Offered";
    Measurand["Voltage"] = "Voltage";
    Measurand["Frequency"] = "Frequency";
    Measurand["Temperature"] = "Temperature";
    Measurand["SoC"] = "SoC";
    Measurand["RPM"] = "RPM";
})(Measurand = exports.Measurand || (exports.Measurand = {}));
var Phase;
(function (Phase) {
    Phase["L1"] = "L1";
    Phase["L2"] = "L2";
    Phase["L3"] = "L3";
    Phase["N"] = "N";
    Phase["L1N"] = "L1-N";
    Phase["L2N"] = "L2-N";
    Phase["L3N"] = "L3-N";
    Phase["L1L2"] = "L1-L2";
    Phase["L2L3"] = "L2-L3";
    Phase["L3L1"] = "L3-L1";
})(Phase = exports.Phase || (exports.Phase = {}));
var Location;
(function (Location) {
    Location["Cable"] = "Cable";
    Location["EV"] = "EV";
    Location["Inlet"] = "Inlet";
    Location["Outlet"] = "Outlet";
    Location["Body"] = "Body";
})(Location = exports.Location || (exports.Location = {}));
var UnitOfMeasure;
(function (UnitOfMeasure) {
    UnitOfMeasure["Wh"] = "Wh";
    UnitOfMeasure["kWh"] = "kWh";
    UnitOfMeasure["varh"] = "varh";
    UnitOfMeasure["kvarh"] = "kvarh";
    UnitOfMeasure["W"] = "W";
    UnitOfMeasure["kW"] = "kW";
    UnitOfMeasure["VA"] = "VA";
    UnitOfMeasure["kVA"] = "kVA";
    UnitOfMeasure["var"] = "var";
    UnitOfMeasure["kvar"] = "kvar";
    UnitOfMeasure["A"] = "A";
    UnitOfMeasure["V"] = "V";
    UnitOfMeasure["K"] = "K";
    UnitOfMeasure["Celcius"] = "Celcius";
    UnitOfMeasure["Fahrenheit"] = "Fahrenheit";
    UnitOfMeasure["Percent"] = "Percent";
})(UnitOfMeasure = exports.UnitOfMeasure || (exports.UnitOfMeasure = {}));
//# sourceMappingURL=SampledValue.js.map