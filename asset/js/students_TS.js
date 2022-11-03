"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.searchVariants = exports.iterateVariantsByQuery = exports.validateQuery = void 0;
var valuesRole = ["striker", "special"];
var valuesAttackType = ["explosion", "penetration", "mystery"];
var valuesDefenseType = ["heavy", "light", "special"];
var valuesPosition = ["front", "middle", "back"];
var valuesCharacterClass = ["tank", "attacker", "healer", "supporter", "t.s"];
var valuesSchool = ["abydos", "arius", "gehenna", "hyakkiyakou", "millenium", "redwinter", "shanhaijing", "srt", "trinity", "valkyrie", "other"];
function validateQuery(query) {
    if (typeof query !== "object" || !query)
        return false;
    var rawQuery = query;
    if (!Array.isArray(rawQuery.role) || rawQuery.role.some(function (r) { return !valuesRole.includes(r); }))
        return false;
    if (!Array.isArray(rawQuery.attackType) || rawQuery.attackType.some(function (r) { return !valuesAttackType.includes(r); }))
        return false;
    if (!Array.isArray(rawQuery.defenseType) || rawQuery.defenseType.some(function (r) { return !valuesDefenseType.includes(r); }))
        return false;
    if (!Array.isArray(rawQuery.position) || rawQuery.position.some(function (r) { return !valuesPosition.includes(r); }))
        return false;
    if (!Array.isArray(rawQuery.characterClass) || rawQuery.characterClass.some(function (r) { return !valuesCharacterClass.includes(r); }))
        return false;
    if (!Array.isArray(rawQuery.school) || rawQuery.school.some(function (r) { return !valuesSchool.includes(r); }))
        return false;
    return true;
}
exports.validateQuery = validateQuery;
function iterateVariantsByQuery(variants, query) {
    var _i, variants_1, variant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, variants_1 = variants;
                _a.label = 1;
            case 1:
                if (!(_i < variants_1.length)) return [3 /*break*/, 4];
                variant = variants_1[_i];
                if (query.school.length > 0 && !query.school.includes(variant.student.school))
                    return [3 /*break*/, 3];
                if (query.role.length > 0 && !query.role.includes(variant.role))
                    return [3 /*break*/, 3];
                if (query.attackType.length > 0 && !query.attackType.includes(variant.attackType))
                    return [3 /*break*/, 3];
                if (query.defenseType.length > 0 && !query.defenseType.includes(variant.defenseType))
                    return [3 /*break*/, 3];
                if (query.position.length > 0 && !query.position.includes(variant.position))
                    return [3 /*break*/, 3];
                if (query.characterClass.length > 0 && !query.characterClass.includes(variant.characterClass))
                    return [3 /*break*/, 3];
                return [4 /*yield*/, variant];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.iterateVariantsByQuery = iterateVariantsByQuery;
function searchVariants(variants, query) {
    return variants.filter(function (v) {
        if (query.school.length > 0 && !query.school.includes(variant.student.school))
            return false;
        if (query.role.length > 0 && !query.role.includes(variant.role))
            return false;
        if (query.attackType.length > 0 && !query.attackType.includes(variant.attackType))
            return false;
        if (query.defenseType.length > 0 && !query.defenseType.includes(variant.defenseType))
            return false;
        if (query.position.length > 0 && !query.position.includes(variant.position))
            return false;
        if (query.characterClass.length > 0 && !query.characterClass.includes(variant.characterClass))
            return false;
        return true;
    });
}
exports.searchVariants = searchVariants;
