"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
// Enum for all the repeatedStrings
var RepeatStringsName;
(function (RepeatStringsName) {
    RepeatStringsName[RepeatStringsName["Descriptions"] = 0] = "Descriptions";
    RepeatStringsName[RepeatStringsName["DisplaySources"] = 1] = "DisplaySources";
    RepeatStringsName[RepeatStringsName["ExpirationTooltip"] = 2] = "ExpirationTooltip";
    RepeatStringsName[RepeatStringsName["ItemTypeDisplayName"] = 3] = "ItemTypeDisplayName";
    RepeatStringsName[RepeatStringsName["ExpiredInActivityMessage"] = 4] = "ExpiredInActivityMessage";
    RepeatStringsName[RepeatStringsName["IconWaterMark"] = 5] = "IconWaterMark";
    RepeatStringsName[RepeatStringsName["TraitIds"] = 6] = "TraitIds";
    RepeatStringsName[RepeatStringsName["UiItemDisplayStyle"] = 7] = "UiItemDisplayStyle";
    RepeatStringsName[RepeatStringsName["PlugCategoryIdentifier"] = 8] = "PlugCategoryIdentifier";
    RepeatStringsName[RepeatStringsName["UiPlugLabel"] = 9] = "UiPlugLabel";
    RepeatStringsName[RepeatStringsName["InsertionMaterialRequirementHash"] = 10] = "InsertionMaterialRequirementHash";
    RepeatStringsName[RepeatStringsName["StackUniqueLabel"] = 11] = "StackUniqueLabel";
    RepeatStringsName[RepeatStringsName["BucketTypeHash"] = 12] = "BucketTypeHash";
    RepeatStringsName[RepeatStringsName["Versions"] = 13] = "Versions";
    RepeatStringsName[RepeatStringsName["StatHash"] = 14] = "StatHash";
    RepeatStringsName[RepeatStringsName["StatGroupHash"] = 15] = "StatGroupHash";
    RepeatStringsName[RepeatStringsName["DamageTypeHashes"] = 16] = "DamageTypeHashes";
    RepeatStringsName[RepeatStringsName["ItemValue"] = 17] = "ItemValue";
    RepeatStringsName[RepeatStringsName["TooltipNotifications"] = 18] = "TooltipNotifications";
    RepeatStringsName[RepeatStringsName["ReusablePlugSetHash"] = 19] = "ReusablePlugSetHash";
    RepeatStringsName[RepeatStringsName["SingleInitialItemHash"] = 20] = "SingleInitialItemHash";
    RepeatStringsName[RepeatStringsName["SocketCategoryHash"] = 21] = "SocketCategoryHash";
    RepeatStringsName[RepeatStringsName["SocketIndexes"] = 22] = "SocketIndexes";
    RepeatStringsName[RepeatStringsName["SocketCategories"] = 23] = "SocketCategories";
    RepeatStringsName[RepeatStringsName["PlugCategoryHash"] = 24] = "PlugCategoryHash";
    RepeatStringsName[RepeatStringsName["SocketEntries"] = 25] = "SocketEntries";
    RepeatStringsName[RepeatStringsName["SocketTypeHash"] = 26] = "SocketTypeHash";
    RepeatStringsName[RepeatStringsName["TalentGridHash"] = 27] = "TalentGridHash";
    RepeatStringsName[RepeatStringsName["Icon"] = 28] = "Icon";
})(RepeatStringsName || (RepeatStringsName = {}));
// These are the definition Ishtar downloads and uses as they are.
// Copied here so they can be downloaded to see if any are getting too large
var NeededDefinitions;
(function (NeededDefinitions) {
    NeededDefinitions[NeededDefinitions["DestinyVendorDefinition"] = 0] = "DestinyVendorDefinition";
    NeededDefinitions[NeededDefinitions["DestinyVendorGroupDefinition"] = 1] = "DestinyVendorGroupDefinition";
    NeededDefinitions[NeededDefinitions["DestinyItemCategoryDefinition"] = 2] = "DestinyItemCategoryDefinition";
    NeededDefinitions[NeededDefinitions["DestinyClassDefinition"] = 3] = "DestinyClassDefinition";
    NeededDefinitions[NeededDefinitions["DestinyRaceDefinition"] = 4] = "DestinyRaceDefinition";
    NeededDefinitions[NeededDefinitions["DestinyItemTierTypeDefinition"] = 5] = "DestinyItemTierTypeDefinition";
    NeededDefinitions[NeededDefinitions["DestinyObjectiveDefinition"] = 6] = "DestinyObjectiveDefinition";
    NeededDefinitions[NeededDefinitions["DestinySandboxPerkDefinition"] = 7] = "DestinySandboxPerkDefinition";
    NeededDefinitions[NeededDefinitions["DestinySocketCategoryDefinition"] = 8] = "DestinySocketCategoryDefinition";
    NeededDefinitions[NeededDefinitions["DestinySocketTypeDefinition"] = 9] = "DestinySocketTypeDefinition";
    NeededDefinitions[NeededDefinitions["DestinyProgressionDefinition"] = 10] = "DestinyProgressionDefinition";
    NeededDefinitions[NeededDefinitions["DestinyActivityModifierDefinition"] = 11] = "DestinyActivityModifierDefinition";
    NeededDefinitions[NeededDefinitions["DestinyArtifactDefinition"] = 12] = "DestinyArtifactDefinition";
    NeededDefinitions[NeededDefinitions["DestinyFactionDefinition"] = 13] = "DestinyFactionDefinition";
    NeededDefinitions[NeededDefinitions["DestinyInventoryBucketDefinition"] = 14] = "DestinyInventoryBucketDefinition";
    NeededDefinitions[NeededDefinitions["DestinyMaterialRequirementSetDefinition"] = 15] = "DestinyMaterialRequirementSetDefinition";
    NeededDefinitions[NeededDefinitions["DestinyMilestoneDefinition"] = 16] = "DestinyMilestoneDefinition";
    NeededDefinitions[NeededDefinitions["DestinyStatDefinition"] = 17] = "DestinyStatDefinition";
    NeededDefinitions[NeededDefinitions["DestinyInventoryItemLiteDefinition"] = 18] = "DestinyInventoryItemLiteDefinition";
    NeededDefinitions[NeededDefinitions["DestinyPowerCapDefinition"] = 19] = "DestinyPowerCapDefinition";
    NeededDefinitions[NeededDefinitions["DestinySeasonDefinition"] = 20] = "DestinySeasonDefinition";
    NeededDefinitions[NeededDefinitions["DestinySeasonPassDefinition"] = 21] = "DestinySeasonPassDefinition";
    NeededDefinitions[NeededDefinitions["DestinyCollectibleDefinition"] = 22] = "DestinyCollectibleDefinition";
    NeededDefinitions[NeededDefinitions["DestinyPresentationNodeDefinition"] = 23] = "DestinyPresentationNodeDefinition";
    NeededDefinitions[NeededDefinitions["DestinyPlugSetDefinition"] = 24] = "DestinyPlugSetDefinition";
    NeededDefinitions[NeededDefinitions["DestinyRecordDefinition"] = 25] = "DestinyRecordDefinition";
    NeededDefinitions[NeededDefinitions["DestinyLoreDefinition"] = 26] = "DestinyLoreDefinition";
    NeededDefinitions[NeededDefinitions["DestinyDamageTypeDefinition"] = 27] = "DestinyDamageTypeDefinition";
})(NeededDefinitions || (NeededDefinitions = {}));
// Strip off the url so only the image name is left
// http:bungie.com/blah/blah/123.jpg -> 123.jpg
function stripImageUrl(url) {
    const index = url.lastIndexOf("/");
    const shortUrl = url.substring(index + 1);
    return shortUrl;
}
// TODO: Update to retry a couple of times instead of failing right away
function downloadJsonFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            throw new Error(`Failed to download JSON file: ${error}`);
        }
    });
}
function createMiniDefinition(jsonData) {
    var _a, _b, _c, _d;
    // Dictionary of the repeat string arrays
    const repeatStrings = {
        [RepeatStringsName.Descriptions]: [],
        [RepeatStringsName.DisplaySources]: [],
        [RepeatStringsName.ExpirationTooltip]: [],
        [RepeatStringsName.ItemTypeDisplayName]: [],
        [RepeatStringsName.ExpiredInActivityMessage]: [],
        [RepeatStringsName.IconWaterMark]: [],
        [RepeatStringsName.TraitIds]: [],
        [RepeatStringsName.UiItemDisplayStyle]: [],
        [RepeatStringsName.PlugCategoryIdentifier]: [],
        [RepeatStringsName.UiPlugLabel]: [],
        [RepeatStringsName.InsertionMaterialRequirementHash]: [],
        [RepeatStringsName.StackUniqueLabel]: [],
        [RepeatStringsName.BucketTypeHash]: [],
        [RepeatStringsName.Versions]: [],
        [RepeatStringsName.StatHash]: [],
        [RepeatStringsName.StatGroupHash]: [],
        [RepeatStringsName.DamageTypeHashes]: [],
        [RepeatStringsName.ItemValue]: [],
        [RepeatStringsName.TooltipNotifications]: [],
        [RepeatStringsName.ReusablePlugSetHash]: [],
        [RepeatStringsName.SingleInitialItemHash]: [],
        [RepeatStringsName.SocketCategoryHash]: [],
        [RepeatStringsName.SocketIndexes]: [],
        [RepeatStringsName.SocketCategories]: [],
        [RepeatStringsName.PlugCategoryHash]: [],
        [RepeatStringsName.SocketEntries]: [],
        [RepeatStringsName.SocketTypeHash]: [],
        [RepeatStringsName.TalentGridHash]: [],
        [RepeatStringsName.Icon]: [],
    };
    // Send a repeat string and get a index value back
    function getRepeatStringIndex(name, s) {
        const index = repeatStrings[name].indexOf(s);
        if (index === -1) {
            repeatStrings[name].push(s);
            return getRepeatStringIndex(name, s);
        }
        return index;
    }
    const processedData = {};
    const sortedDataKeys = Object.keys(jsonData).sort((a, b) => parseFloat(a) - parseFloat(b));
    for (const key of sortedDataKeys) {
        const item = {};
        if (jsonData.hasOwnProperty(key)) {
            const redacted = jsonData[key].redacted;
            if (redacted) {
                item.r = 1;
            }
            const displayProperties = jsonData[key].displayProperties;
            if (displayProperties) {
                const name = displayProperties.name;
                if (name) {
                    item.n = name;
                }
                else if (!redacted) {
                    continue;
                }
                const description = displayProperties.description;
                if (description) {
                    item.d = getRepeatStringIndex(RepeatStringsName.Descriptions, description);
                }
                const icon = displayProperties.icon;
                if (icon) {
                    item.i = stripImageUrl(icon);
                }
                const iconSequences = displayProperties.iconSequences;
                if (iconSequences) {
                    const f = [];
                    for (const section of iconSequences) {
                        const framesArray = [];
                        for (const frame of section.frames) {
                            framesArray.push(getRepeatStringIndex(RepeatStringsName.Icon, frame.toString()));
                        }
                        if (framesArray.length > 0) {
                            f.push(framesArray);
                        }
                    }
                    if (f.length > 0) {
                        item.f = f;
                    }
                }
            }
            const secondaryIcon = jsonData[key].secondaryIcon;
            if (secondaryIcon) {
                item.si = stripImageUrl(secondaryIcon);
            }
            const secondaryOverlay = jsonData[key].secondaryOverlay;
            if (secondaryOverlay) {
                item.so = stripImageUrl(secondaryOverlay);
            }
            const secondarySpecial = jsonData[key].secondarySpecial;
            if (secondarySpecial) {
                item.ss = stripImageUrl(secondarySpecial);
            }
            const screenshot = jsonData[key].screenshot;
            if (screenshot) {
                item.s = stripImageUrl(screenshot);
            }
            const allowActions = jsonData[key].allowActions;
            if (!allowActions) {
                item.a = 0;
            }
            const nonTransferrable = jsonData[key].nonTransferrable;
            if (nonTransferrable) {
                item.nt = 1;
            }
            const equippable = jsonData[key].equippable;
            if (equippable) {
                item.e = 1;
            }
            const doesPostmasterPullHaveSideEffects = jsonData[key].doesPostmasterPullHaveSideEffects;
            if (doesPostmasterPullHaveSideEffects) {
                item.pm = 1;
            }
            const displaySource = jsonData[key].displaySource;
            if (displaySource) {
                item.ds = getRepeatStringIndex(RepeatStringsName.DisplaySources, displaySource);
            }
            const itemType = jsonData[key].itemType;
            if (itemType) {
                item.it = itemType;
            }
            const itemSubType = jsonData[key].itemSubType;
            if (itemSubType) {
                item.is = itemSubType;
            }
            const classType = jsonData[key].classType;
            if (classType) {
                item.c = classType;
            }
            const itemTypeDisplayName = jsonData[key].itemTypeDisplayName;
            if (itemTypeDisplayName) {
                item.itd = getRepeatStringIndex(RepeatStringsName.ItemTypeDisplayName, itemTypeDisplayName);
            }
            /// Values
            const itemValues = (_a = jsonData[key].value) === null || _a === void 0 ? void 0 : _a.itemValue;
            if (itemValues) {
                const v = [];
                for (const itemValue of itemValues) {
                    const val = {};
                    const itemHash = itemValue.itemHash;
                    if (itemHash === 0) {
                        continue;
                    }
                    val.ih = getRepeatStringIndex(RepeatStringsName.ItemValue, itemHash);
                    if (itemValue.quantity > 0) {
                        val.q = itemValue.quantity;
                    }
                    if (Object.keys(val).length > 0) {
                        v.push(val);
                    }
                    if (Object.keys(v).length > 0) {
                        item.v = v;
                    }
                }
            }
            /// inventory
            const inventory = jsonData[key].inventory;
            if (inventory) {
                const tierType = inventory === null || inventory === void 0 ? void 0 : inventory.tierType;
                if (tierType) {
                    item.t = tierType;
                }
                const bucketTypeHash = inventory === null || inventory === void 0 ? void 0 : inventory.bucketTypeHash;
                if (bucketTypeHash) {
                    item.b = getRepeatStringIndex(RepeatStringsName.BucketTypeHash, bucketTypeHash);
                }
                const stackUniqueLabel = inventory === null || inventory === void 0 ? void 0 : inventory.stackUniqueLabel;
                if (stackUniqueLabel) {
                    item.su = getRepeatStringIndex(RepeatStringsName.StackUniqueLabel, stackUniqueLabel);
                }
                const expirationTooltip = inventory === null || inventory === void 0 ? void 0 : inventory.expirationTooltip;
                if (expirationTooltip) {
                    item.et = getRepeatStringIndex(RepeatStringsName.ExpirationTooltip, expirationTooltip);
                }
                const expiredInActivityMessage = inventory === null || inventory === void 0 ? void 0 : inventory.expiredInActivityMessage;
                if (expiredInActivityMessage) {
                    item.em = getRepeatStringIndex(RepeatStringsName.ExpiredInActivityMessage, expiredInActivityMessage);
                }
                const maxStackSize = inventory === null || inventory === void 0 ? void 0 : inventory.maxStackSize;
                if (maxStackSize) {
                    item.m = maxStackSize;
                }
            }
            const investmentStats = jsonData[key].investmentStats;
            if (investmentStats) {
                const iv = {};
                for (const stat of investmentStats) {
                    const value = stat.value;
                    if (value > 0) {
                        const statTypeHash = stat.statTypeHash;
                        iv[statTypeHash] = value;
                    }
                }
                if (Object.keys(iv).length > 0) {
                    item.iv = iv;
                }
            }
            const damageTypeHashes = jsonData[key].damageTypeHashes;
            if (damageTypeHashes) {
                const dt = [];
                for (const damageHash of damageTypeHashes) {
                    dt.push(getRepeatStringIndex(RepeatStringsName.DamageTypeHashes, damageHash));
                }
                if (dt.length > 0) {
                    item.dt = dt;
                }
            }
            ///equipping block?
            const ammoType = (_b = jsonData[key].equippingBlock) === null || _b === void 0 ? void 0 : _b.ammoType;
            if (ammoType) {
                item.at = ammoType;
            }
            const breakerType = jsonData[key].breakerType;
            if (breakerType) {
                item.bt = breakerType;
            }
            /// Is this needed any more?
            const talentGridHash = (_c = jsonData[key].talentGrid) === null || _c === void 0 ? void 0 : _c.talentGridHash;
            if (talentGridHash && talentGridHash !== 0) {
                item.th = getRepeatStringIndex(RepeatStringsName.TalentGridHash, talentGridHash);
            }
            const uiItemDisplayStyle = jsonData[key].uiItemDisplayStyle;
            if (uiItemDisplayStyle) {
                item.ids = getRepeatStringIndex(RepeatStringsName.UiItemDisplayStyle, uiItemDisplayStyle);
            }
            const iconWatermark = jsonData[key].iconWatermark;
            if (iconWatermark) {
                item.iw = getRepeatStringIndex(RepeatStringsName.IconWaterMark, stripImageUrl(iconWatermark));
            }
            // Quality
            const quality = jsonData[key].quality;
            if (quality) {
                const versions = quality.versions;
                if (versions) {
                    const qv = [];
                    for (const version of versions) {
                        qv.push(getRepeatStringIndex(RepeatStringsName.Versions, version.powerCapHash));
                    }
                    if (qv.length > 0) {
                        item.qv = qv;
                    }
                }
                const displayVersionWatermarkIcons = jsonData[key].displayVersionWatermarkIcons;
                if (displayVersionWatermarkIcons) {
                    const dvwi = [];
                    const sortedWatermarkKeys = Object.keys(displayVersionWatermarkIcons).sort((a, b) => parseFloat(a) - parseFloat(b));
                    for (const watermark of sortedWatermarkKeys) {
                        if (!watermark) {
                            continue;
                        }
                        dvwi.push(getRepeatStringIndex(RepeatStringsName.IconWaterMark, stripImageUrl(watermark)));
                    }
                    if (dvwi.length > 0) {
                        item.dvwi = dvwi;
                    }
                }
            }
            /// Stats
            var stats = jsonData[key].stats;
            if (stats) {
                const st = {};
                const itemStats = stats.stats;
                const s = {};
                const sortedStatKeys = Object.keys(itemStats).sort((a, b) => parseFloat(a) - parseFloat(b));
                for (const key of sortedStatKeys) {
                    s[getRepeatStringIndex(RepeatStringsName.StatHash, key)] = itemStats[key].value;
                }
                if (Object.keys(s).length > 0) {
                    st.s = s;
                }
                var statGroupHash = stats.statGroupHash;
                if (statGroupHash) {
                    st.sgs = getRepeatStringIndex(RepeatStringsName.StatGroupHash, statGroupHash);
                }
                if (Object.keys(st).length > 0) {
                    item.st = st;
                }
            }
            var previewVendorHash = (_d = jsonData[key].preview) === null || _d === void 0 ? void 0 : _d.previewVendorHash;
            if (previewVendorHash) {
                const p = previewVendorHash;
                if (p) {
                    item.pv = p;
                }
            }
            /// setData
            const setData = jsonData[key].setData;
            if (setData) {
                const sD = {};
                const questLineName = setData.questLineName;
                if (questLineName) {
                    sD.qN = questLineName;
                }
                if (sD) {
                    item.sD = sD;
                }
            }
            const tooltipNotifications = jsonData[key].tooltipNotifications;
            if (tooltipNotifications) {
                const ttn = [];
                for (const tt of tooltipNotifications) {
                    const ttString = tt.displayString;
                    if (ttString) {
                        ttn.push(getRepeatStringIndex(RepeatStringsName.TooltipNotifications, ttString));
                    }
                    /// NOTE!!! Ishtar only uses the first tooltip so no need to keep the others?
                    /// Hmmm probably was used by some items in the detail view?
                    break;
                }
                if (ttn.length > 0) {
                    item.ttn = ttn;
                }
            }
            /// Perks
            const perks = jsonData[key].perks;
            if (perks) {
                const ph = [];
                for (const perk of perks) {
                    const jPerk = {};
                    const perkHash = perk.perkHash;
                    if (perkHash) {
                        jPerk.ph = perkHash;
                    }
                    var perkVisibility = perk.perkVisibility;
                    if (perkVisibility) {
                        jPerk.pv = perkVisibility;
                    }
                    if (Object.keys(jPerk).length > 0) {
                        ph.push(jPerk);
                    }
                }
                if (ph.length > 0) {
                    item.ph = ph;
                }
            }
            var plug = jsonData[key].plug;
            if (plug) {
                const p = {};
                const plugCategoryHash = plug === null || plug === void 0 ? void 0 : plug.plugCategoryHash;
                if (plugCategoryHash) {
                    p.p = getRepeatStringIndex(RepeatStringsName.PlugCategoryHash, plugCategoryHash);
                }
                /// NOTE: This change breaks the existing app. All it needs to do to get the correct
                /// PlugCategoryIdentifier is use the p.p index number to get the name from the
                /// PlugCategoryIdentifier array in the jsonDef
                const plugCategoryIdentifier = plug.plugCategoryIdentifier;
                if (plugCategoryIdentifier) {
                    /// Intentionally call the function but don't save the result here. The p.p index will be the same.
                    getRepeatStringIndex(RepeatStringsName.PlugCategoryIdentifier, plugCategoryIdentifier);
                }
                var uiPlugLabel = plug.uiPlugLabel;
                if (uiPlugLabel) {
                    p.pl = getRepeatStringIndex(RepeatStringsName.UiPlugLabel, uiPlugLabel);
                }
                const insertionMaterialRequirementHash = plug === null || plug === void 0 ? void 0 : plug.insertionMaterialRequirementHash;
                if (insertionMaterialRequirementHash && insertionMaterialRequirementHash !== 0) {
                    p.im = getRepeatStringIndex(RepeatStringsName.InsertionMaterialRequirementHash, insertionMaterialRequirementHash);
                }
                if (Object.keys(p).length > 0) {
                    item.p = p;
                }
            }
            var traitIds = jsonData[key].traitIds;
            if (traitIds) {
                const ti = [];
                for (const traitId of traitIds) {
                    ti.push(getRepeatStringIndex(RepeatStringsName.TraitIds, traitId));
                }
                if (ti.length > 0) {
                    item.tI = ti;
                }
            }
            /// NOTE:!!!! This changes the names of many socket properties and will break current Ishtar
            const sockets = jsonData[key].sockets;
            if (sockets) {
                const sk = {};
                const socketEntries = sockets === null || sockets === void 0 ? void 0 : sockets.socketEntries;
                const se = [];
                for (const socketEntry of socketEntries) {
                    const socEntry = {};
                    const p = socketEntry === null || socketEntry === void 0 ? void 0 : socketEntry.plugSources;
                    if (p) {
                        socEntry.p = p;
                    }
                    const st = socketEntry === null || socketEntry === void 0 ? void 0 : socketEntry.socketTypeHash;
                    if (st) {
                        socEntry.st = getRepeatStringIndex(RepeatStringsName.SocketTypeHash, st);
                    }
                    const rp = socketEntry.reusablePlugSetHash;
                    if (rp) {
                        socEntry.r = getRepeatStringIndex(RepeatStringsName.ReusablePlugSetHash, rp);
                    }
                    const s = socketEntry.singleInitialItemHash;
                    if (s && s !== 0) {
                        socEntry.s = getRepeatStringIndex(RepeatStringsName.SingleInitialItemHash, s);
                    }
                    if (socEntry) {
                        se.push(socEntry);
                    }
                }
                if (se.length > 0) {
                    sk.se = getRepeatStringIndex(RepeatStringsName.SocketEntries, JSON.stringify(se));
                }
                const scJson = [];
                for (const socketCategory of sockets.socketCategories) {
                    const socCatEntry = {};
                    var h = socketCategory === null || socketCategory === void 0 ? void 0 : socketCategory.socketCategoryHash;
                    if (h) {
                        socCatEntry.h = getRepeatStringIndex(RepeatStringsName.SocketCategoryHash, h);
                    }
                    /// NOTE: In ishtar you want to Json.parse the string you get to turn it into a json array.
                    var socketIndexes = socketCategory === null || socketCategory === void 0 ? void 0 : socketCategory.socketIndexes;
                    if (socketIndexes) {
                        socCatEntry.i = getRepeatStringIndex(RepeatStringsName.SocketIndexes, JSON.stringify(socketIndexes));
                        scJson.push(socCatEntry);
                    }
                }
                if (scJson.length > 0) {
                    /// NOTE: In ishtar you want to Json.parse the string you get to turn it into a json array.
                    sk.sc = getRepeatStringIndex(RepeatStringsName.SocketCategories, JSON.stringify(scJson));
                }
                if (Object.keys(sk).length > 0) {
                    item.sk = sk;
                }
            }
        }
        // Only add items with data
        if (Object.keys(item).length > 0) {
            processedData[key] = item; // Assign 'item' directly to the key
        }
    }
    // Add the repeatStrings to the output JSON
    // Create an array of enum names by filtering out invalid enum values
    const enumNames = Object.keys(RepeatStringsName).filter((key) => isNaN(Number(key)));
    // Iterate over the enum names
    for (const enumName of enumNames) {
        const stringArray = repeatStrings[RepeatStringsName[enumName]];
        processedData[enumName] = stringArray;
    }
    return processedData;
}
function saveToJsonFile(data, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonString = JSON.stringify(data, null, 0);
            yield fs.promises.writeFile(filePath, jsonString, "utf-8");
            console.log(`Data saved to ${filePath}`);
        }
        catch (error) {
            throw new Error(`Failed to save data to file: ${error}`);
        }
    });
}
function loadJsonFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            }
            catch (parseError) {
                reject(parseError);
            }
        });
    });
}
function useContentPaths(jsonWorldComponentContentPaths) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (const key in jsonWorldComponentContentPaths) {
            const definitionUrl = "https://bungie.com" + jsonWorldComponentContentPaths[key].DestinyInventoryItemDefinition;
            promises.push(downloadAndMinifyDefinition(definitionUrl, key));
        }
        // Wait for all promises to resolve in parallel
        yield Promise.all(promises);
    });
}
// Used when investigating. This downloads and saves the original bungieItemDef files which are huge.
function getFullDefinitions() {
    return __awaiter(this, void 0, void 0, function* () {
        const manifestUrl = "https://www.bungie.net/Platform/Destiny2/Manifest/";
        const jsonManifest = yield downloadJsonFile(manifestUrl);
        const jsonWorldComponentContentPaths = jsonManifest.Response.jsonWorldComponentContentPaths;
        const promises = [];
        for (const key in jsonWorldComponentContentPaths) {
            const definitionUrl = "https://bungie.com" + jsonWorldComponentContentPaths[key].DestinyInventoryItemDefinition;
            const jsonData = yield downloadJsonFile(definitionUrl);
            yield saveToJsonFile(jsonData, `full-sized-def-${key}.json`);
        }
        // Wait for all promises to resolve in parallel
        yield Promise.all(promises);
    });
}
function getAllBungieDefinitions() {
    return __awaiter(this, void 0, void 0, function* () {
        const manifestUrl = "https://www.bungie.net/Platform/Destiny2/Manifest/";
        const jsonManifest = yield downloadJsonFile(manifestUrl);
        const promises = [];
        const enumNames = Object.keys(NeededDefinitions).filter((key) => isNaN(Number(key)));
        // Iterate over the enum names
        for (const enumName of enumNames) {
            const defUrl = jsonManifest.Response.jsonWorldComponentContentPaths.en[`${enumName}`];
            const definitionUrl = "https://bungie.com" + defUrl;
            const jsonData = yield downloadJsonFile(definitionUrl);
            yield saveToJsonFile(jsonData, `${enumName}.json`);
        }
    });
}
function downloadAndMinifyDefinition(definitionUrl, key) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time(`${key} download-json`);
        const jsonData = yield downloadJsonFile(definitionUrl);
        console.timeEnd(`${key} download-json`);
        console.time(`${key} parse-took:`);
        const processedData = createMiniDefinition(jsonData);
        console.timeEnd(`${key} parse-took:`);
        const outputFilePath = path_1.default.join(__dirname, `../../frontend/public/json/${key}.json`);
        console.time(`${key} save-took:`);
        yield saveToJsonFile(processedData, outputFilePath);
        console.timeEnd(`${key} save-took:`);
        console.log("");
    });
}
function isNewManifest(jsonManifest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const manifestPath = path_1.default.join(__dirname, "../runner/bungieManifest.json");
            const oldJson = yield loadJsonFile(manifestPath);
            return JSON.stringify(jsonManifest) !== JSON.stringify(oldJson);
        }
        catch (error) {
            console.error("Error comparing JSON files:", error);
            return false;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.time("download-manifest");
            const manifestUrl = "https://www.bungie.net/Platform/Destiny2/Manifest/";
            const jsonManifest = yield downloadJsonFile(manifestUrl);
            const isNew = yield isNewManifest(jsonManifest);
            if (isNew) {
                const jsonManifest = yield downloadJsonFile(manifestUrl);
                console.timeEnd("download-manifest");
                const jsonWorldComponentContentPaths = jsonManifest.Response.jsonWorldComponentContentPaths;
                console.time("total-json-parse");
                yield useContentPaths(jsonWorldComponentContentPaths);
                console.timeEnd("total-json-parse");
                const time = new Date().toISOString();
                const manifest = { version: time };
                const savePath = path_1.default.join(__dirname, `../../frontend/public/json/manifest.json`);
                yield saveToJsonFile(manifest, savePath);
                const manifestSavePath = path_1.default.join(__dirname, "../runner/bungieManifest.json");
                yield saveToJsonFile(jsonManifest, manifestSavePath);
            }
            else {
                console.log("No new manifest detected");
                process.exit(1);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
