import * as fs from "fs"

// Just needed while prototyping
const apiUrl =
  "https://bungie.com/common/destiny2_content/json/en/DestinyInventoryItemDefinition-b83e6d2c-3ddc-42b6-b434-565c3dc82769.json"
const outputFilePath = "output.json"

// Enum for all the repeatedStrings
enum RepeatStringsName {
  Descriptions,
  DisplaySources,
  ExpirationTooltip,
  ItemTypeDisplayName,
  ExpiredInActivityMessage,
  IconWaterMark,
  TraitIds,
  UiItemDisplayStyle,
  PlugCategoryIdentifier,
  UiPlugLabel,
  InsertionMaterialRequirementHash,
  StackUniqueLabel,
  BucketTypeHash,
  Versions,
  StatHash,
  StatGroupHash,
  DamageTypeHashes,
  ItemValue,
  TooltipNotifications,
  ReusablePlugSetHash,
  SingleInitialItemHash,
  SocketCategoryHash,
  SocketIndexes,
  SocketCategories,
  PlugCategoryHash,
  SocketEntries,
  SocketTypeHash,
  TalentGridHash,
}

// Interface (Schema) for the DestinyItemDefinition
interface JsonData {
  [key: string]: {
    displayVersionWatermarkIcons: any
    quality?: {
      versions?: any[]
    }
    iconWatermark?: any
    uiItemDisplayStyle?: any
    equippingBlock?: any
    breakerType?: any
    talentGrid?: any
    damageTypeHashes?: any
    redacted?: any
    value?: {
      itemValue?: [itemHash?: string, quantity?: any]
    }
    displayProperties?: {
      name?: any
      description?: any
      icon?: any
    }
    secondaryIcon?: any
    secondarySpecial?: any
    secondaryOverlay?: any
    screenshot?: any
    investmentStats?: [statTypeHash?: any, value?: any]
    nonTransferrable?: any
    allowActions?: any
    equippable?: any
    doesPostmasterPullHaveSideEffects?: any
    displaySource?: any
    itemType?: any
    itemSubType?: any
    classType?: any
    itemTypeDisplayName?: any
    inventory?: {
      tierType?: any
      maxStackSize?: any
      bucketTypeHash?: any
      stackUniqueLabel?: any
      expirationTooltip?: any
      expiredInActivityMessage?: any
    }
  }
}

// Dictionary of the repeat string arrays
const repeatStrings: Record<RepeatStringsName, string[]> = {
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
}

// Send a repeat string and get a index value back
function getRepeatStringIndex(name: RepeatStringsName, s: string): number {
  const index = repeatStrings[name].indexOf(s)
  if (index === -1) {
    repeatStrings[name].push(s)
    return getRepeatStringIndex(name, s)
  }

  return index
}

// Strip off the url so only the image name is left
// http:bungie.com/blah/blah/123.jpg -> 123.jpg
function stripImageUrl(url: string): string {
  const index = url.lastIndexOf("/")
  const shortUrl = url.substring(index + 1)
  return shortUrl
}

async function downloadJsonFile(url: string): Promise<any> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`)
    }

    const contentEncoding = response.headers.get("Content-Encoding")
    console.log(contentEncoding)
    return response.json()
  } catch (error) {
    throw new Error(`Failed to download JSON file: ${error}`)
  }
}

async function processJson(jsonData: JsonData): Promise<any> {
  const processedData: { [key: string]: any } = {}

  for (const key in jsonData) {
    const item: any = {}
    if (jsonData.hasOwnProperty(key)) {
      const redacted = jsonData[key].redacted
      if (redacted) {
        item.r = 1
      }

      const displayProperties = jsonData[key].displayProperties
      if (displayProperties) {
        const name = displayProperties.name
        if (name) {
          item.n = name
        } else if (!redacted) {
          continue
        }

        const description = displayProperties.description
        if (description) {
          item.d = getRepeatStringIndex(
            RepeatStringsName.Descriptions,
            description
          )
        }

        const icon = displayProperties.icon
        if (icon) {
          item.i = stripImageUrl(icon)
        }
      }

      const secondaryIcon = jsonData[key].secondaryIcon
      if (secondaryIcon) {
        item.si = stripImageUrl(secondaryIcon)
      }

      const secondaryOverlay = jsonData[key].secondaryOverlay
      if (secondaryOverlay) {
        item.so = stripImageUrl(secondaryOverlay)
      }
      const secondarySpecial = jsonData[key].secondarySpecial
      if (secondarySpecial) {
        item.ss = stripImageUrl(secondarySpecial)
      }

      const screenshot = jsonData[key].screenshot
      if (screenshot) {
        item.s = stripImageUrl(screenshot)
      }

      const allowActions = jsonData[key].allowActions
      if (!allowActions) {
        item.a = 0
      }

      const nonTransferrable = jsonData[key].nonTransferrable
      if (nonTransferrable) {
        item.nt = 1
      }

      const equippable = jsonData[key].equippable
      if (equippable) {
        item.e = 1
      }

      const doesPostmasterPullHaveSideEffects =
        jsonData[key].doesPostmasterPullHaveSideEffects
      if (doesPostmasterPullHaveSideEffects) {
        item.pm = 1
      }

      const displaySource = jsonData[key].displaySource
      if (displaySource) {
        item.ds = getRepeatStringIndex(
          RepeatStringsName.DisplaySources,
          displaySource
        )
      }

      const itemType = jsonData[key].itemType
      if (itemType) {
        item.it = itemType
      }

      const itemSubType = jsonData[key].itemSubType
      if (itemSubType) {
        item.is = itemSubType
      }

      const classType = jsonData[key].classType
      if (classType) {
        item.c = classType
      }

      const itemTypeDisplayName = jsonData[key].itemTypeDisplayName
      if (itemTypeDisplayName) {
        item.itd = getRepeatStringIndex(
          RepeatStringsName.ItemTypeDisplayName,
          itemTypeDisplayName
        )
      }

      /// Values
      const itemValues = jsonData[key].value?.itemValue

      if (itemValues) {
        const v: any[] = []

        for (const itemValue of itemValues) {
          const val: any = {}

          const itemHash = itemValue.itemHash

          if (itemHash === 0) {
            continue
          }
          val.ih = getRepeatStringIndex(RepeatStringsName.ItemValue, itemHash)
          if (itemValue.quantity > 0) {
            val.q = itemValue.quantity
          }

          if (Object.keys(val).length > 0) {
            v.push(val)
          }

          if (Object.keys(v).length > 0) {
            item.v = v
          }
        }
      }

      /// inventory
      const inventory = jsonData[key].inventory
      if (inventory) {
        const tierType = inventory?.tierType
        if (tierType) {
          item.t = tierType
        }

        const bucketTypeHash = inventory?.bucketTypeHash
        if (bucketTypeHash) {
          item.b = getRepeatStringIndex(
            RepeatStringsName.BucketTypeHash,
            bucketTypeHash
          )
        }

        const stackUniqueLabel = inventory?.stackUniqueLabel
        if (stackUniqueLabel) {
          item.su = getRepeatStringIndex(
            RepeatStringsName.StackUniqueLabel,
            stackUniqueLabel
          )
        }

        const expirationTooltip = inventory?.expirationTooltip
        if (expirationTooltip) {
          item.et = getRepeatStringIndex(
            RepeatStringsName.ExpirationTooltip,
            expirationTooltip
          )
        }

        const expiredInActivityMessage = inventory?.expiredInActivityMessage
        if (expiredInActivityMessage) {
          item.em = getRepeatStringIndex(
            RepeatStringsName.ExpiredInActivityMessage,
            expiredInActivityMessage
          )
        }

        const maxStackSize = inventory?.maxStackSize
        if (maxStackSize) {
          item.m = maxStackSize
        }
      }

      const investmentStats = jsonData[key].investmentStats

      if (investmentStats) {
        const iv: any = {}

        for (const stat of investmentStats) {
          const value = stat.value

          if (value > 0) {
            const statTypeHash = stat.statTypeHash
            iv[statTypeHash] = value
          }
        }

        if (Object.keys(iv).length > 0) {
          item.iv = iv
        }
      }

      const damageTypeHashes = jsonData[key].damageTypeHashes
      if (damageTypeHashes) {
        const dt: any[] = []

        for (const damageHash of damageTypeHashes) {
          dt.push(
            getRepeatStringIndex(RepeatStringsName.DamageTypeHashes, damageHash)
          )
        }

        if (dt.length > 0) {
          item.dt = dt
        }
      }

      ///equipping block?
      const ammoType = jsonData[key].equippingBlock?.ammoType
      if (ammoType) {
        item.at = ammoType
      }

      const breakerType = jsonData[key].breakerType
      if (breakerType) {
        item.bt = breakerType
      }

      /// Is this needed any more?
      const talentGridHash = jsonData[key].talentGrid?.talentGridHash
      if (talentGridHash && talentGridHash !== 0) {
        item.th = getRepeatStringIndex(
          RepeatStringsName.TalentGridHash,
          talentGridHash
        )
      }

      const uiItemDisplayStyle = jsonData[key].uiItemDisplayStyle
      if (uiItemDisplayStyle) {
        item.ids = getRepeatStringIndex(
          RepeatStringsName.UiItemDisplayStyle,
          uiItemDisplayStyle
        )
      }

      const iconWatermark = jsonData[key].iconWatermark
      if (iconWatermark) {
        item.iw = getRepeatStringIndex(
          RepeatStringsName.IconWaterMark,
          stripImageUrl(iconWatermark)
        )
      }

      // Quality
      const quality = jsonData[key].quality
      if (quality) {
        const versions = quality.versions

        if (versions) {
          const qv: any[] = []
          for (const version of versions) {
            qv.push(
              getRepeatStringIndex(
                RepeatStringsName.Versions,
                version.powerCapHash
              )
            )
          }
          if (qv.length > 0) {
            item.qv = qv
          }
        }

        const displayVersionWatermarkIcons = jsonData[key].displayVersionWatermarkIcons
        if (displayVersionWatermarkIcons) {
          const dvwi: any[] = []

            for (const watermark in displayVersionWatermarkIcons) {
                if (!watermark) {
                    continue
                }
                dvwi.push(getRepeatStringIndex(RepeatStringsName.IconWaterMark, stripImageUrl(watermark)))
            }

            if (dvwi.length > 0) {
                item.dvwi = dvwi
            }
        }
      }

      // /// Stats
      // var stats = item.stats
      // if stats {

      //     Json st

      //     var itemStats = stats.stats.toDictionary()

      //     Json s
      //     for var stat in itemStats.keys() {
      //         s[root.getRepeatStringIndex(.StatHash, stat).toString()] = itemStats[stat].value.toInt()
      //     }
      //     if s {
      //         st.s = s
      //     }

      //     var statGroupHash = stats.statGroupHash.toString()
      //     if statGroupHash {
      //         st.sgs = root.getRepeatStringIndex(.StatGroupHash, statGroupHash)
      //     }

      //     if st {
      //         i.st = st
      //     }
      // }

      // var previewVendorHash = item.preview.previewVendorHash

      // if previewVendorHash {
      //     var p = previewVendorHash.toString()

      //     if p.length  > 1 {
      //         i.pv = p
      //     }
      // }

      // /// setData
      // var setData = item.setData
      // if setData {
      //     Json sD

      //     var questLineName = setData.questLineName
      //     if questLineName {
      //         sD.qN = questLineName
      //     }

      //     if sD {
      //         i.sD = sD
      //     }
      // }

      // var tooltipNotifications = item.tooltipNotifications
      // if tooltipNotifications {
      //     Json[] ttn

      //     for var tt in tooltipNotifications.toArray() {
      //         var ttString = tt.displayString.toString()

      //         if ttString {
      //             ttn.append(root.getRepeatStringIndex(.TooltipNotifications, ttString))
      //         }

      //         /// NOTE!!! Ishtar only uses the first tooltip so no need to keep the others?
      //         /// Hmmm probably was used by some items in the detail view?
      //         break

      //     }

      //     if ttn.length > 0 {
      //         i.ttn = ttn
      //     }
      // }

      // /// Perks
      // var perks = item.perks
      // if perks {
      //     Json[] ph

      //     for var perk in perks.toArray() {

      //         Json jPerk
      //         var perkHash = perk.perkHash
      //         if perkHash {
      //             jPerk.ph = perkHash
      //         }
      //         var perkVisibility = perk.perkVisibility.toInt()
      //         if perkVisibility {
      //             jPerk.pv = perkVisibility
      //         }

      //         if jPerk {
      //             ph.append(jPerk)
      //         }
      //     }

      //     if ph.length > 0 {

      //         i.ph = ph
      //     }
      // }

      // var plug = item.plug
      // if plug {

      //     Json p

      //     var plugCategoryHash = plug.plugCategoryHash.toString()
      //     if plugCategoryHash {
      //         p.p = root.getRepeatStringIndex(.PlugCategoryHash, plugCategoryHash)
      //     }

      //     /// NOTE: This change breaks the existing app. All it needs to do to get the correct
      //     /// PlugCategoryIdentifier is use the p.p index number to get the name from the
      //     /// PlugCategoryIdentifier array in the jsonDef
      //     var plugCategoryIdentifier = plug.plugCategoryIdentifier.toString()
      //     if plugCategoryIdentifier {
      //         /// Intentionally call the function but don't save the result here. The p.p index will be the same.
      //         root.getRepeatStringIndex(.PlugCategoryIdentifier, plugCategoryIdentifier)
      //     }

      //     var uiPlugLabel = plug.uiPlugLabel.toString()
      //     if uiPlugLabel {
      //         p.pl = root.getRepeatStringIndex(.UiPlugLabel, uiPlugLabel)
      //     }

      //     var insertionMaterialRequirementHash = plug.insertionMaterialRequirementHash.toString()
      //     if insertionMaterialRequirementHash && insertionMaterialRequirementHash != "0" {
      //         p.im = root.getRepeatStringIndex(.InsertionMaterialRequirementHash, insertionMaterialRequirementHash)
      //     }

      //     if p {
      //         i.p = p
      //     }
      // }

      // var traitIds = item.traitIds

      // if traitIds {
      //     Json ti

      //     for var traitId in traitIds.toArray() {
      //         ti.append(root.getRepeatStringIndex(.TraitIds, traitId.toString()))
      //     }

      //     if ti {
      //         i.tI = ti
      //     }
      // }

      // /// NOTE:!!!! This changes the names of many socket properties and will break current Ishtar
      // var sockets = item.sockets
      // if sockets {

      //     Json sk

      //     var socketEntries = sockets.socketEntries

      //     Json[] se
      //     for var socketEntry in socketEntries.toArray() {
      //         Json socEntry
      //         var p = socketEntry.plugSources
      //         // System.log(socketEntry)
      //         if p {
      //             socEntry.p = p.toInt()
      //         }
      //         //socketTypeHash
      //         //
      //         var st = socketEntry.socketTypeHash.toString()
      //         if st {
      //             socEntry.st = root.getRepeatStringIndex(.SocketTypeHash, st)
      //         }
      //         var rp = socketEntry.reusablePlugSetHash.toString()
      //         if rp {
      //             socEntry.r = root.getRepeatStringIndex(.ReusablePlugSetHash, rp)
      //         }

      //         var s = socketEntry.singleInitialItemHash.toString()
      //         if s && s != "0" {
      //             socEntry.s = root.getRepeatStringIndex(.SingleInitialItemHash, s)
      //         }

      //         if socEntry {
      //             se.append(socEntry)
      //         }

      //     }

      //     if se.length > 0 {
      //         sk.se = root.getRepeatStringIndex(.SocketEntries, Json.stringify(se))
      //     }

      //     Json[] scJson
      //     for var socketCategory in sockets.socketCategories.toArray() {
      //         Json socCatEntry

      //         var h = socketCategory.socketCategoryHash.toString()
      //         if h {
      //             socCatEntry.h = root.getRepeatStringIndex(.SocketCategoryHash, h)
      //         }

      //         /// NOTE: In ishtar you want to Json.parse the string you get to turn it into a json array.
      //         var socketIndexes = socketCategory.socketIndexes
      //         if socketIndexes {
      //             socCatEntry.i = root.getRepeatStringIndex(.SocketIndexes, Json.stringify(socketIndexes))
      //             scJson.append(socCatEntry)
      //         }

      //     }
      //     if scJson.length > 0 {
      //         /// NOTE: In ishtar you want to Json.parse the string you get to turn it into a json array.
      //         sk.sc = root.getRepeatStringIndex(.SocketCategories, Json.stringify(scJson))
      //     }

      //     if sk {
      //         i.sk = sk
      //     }

      // }
    }
    // Only add items with data
    if (Object.keys(item).length > 0) {
      processedData[key] = item // Assign 'item' directly to the key
    }
  }

  // Add the repeatStrings to the output JSON
  // Create an array of enum names by filtering out invalid enum values
  const enumNames = Object.keys(RepeatStringsName).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof RepeatStringsName)[]

  // Iterate over the enum names
  for (const enumName of enumNames) {
    const stringArray = repeatStrings[RepeatStringsName[enumName]]
    processedData[enumName] = stringArray
  }

  return processedData
}

async function saveToJsonFile(data: any, filePath: string): Promise<void> {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    await fs.promises.writeFile(filePath, jsonString, "utf-8")
    console.log(`Data saved to ${filePath}`)
  } catch (error) {
    throw new Error(`Failed to save data to file: ${error}`)
  }
}

async function main() {
  try {
    console.time("download-json")
    const jsonData = await downloadJsonFile(apiUrl)
    console.timeEnd("download-json")

    console.time("parse-took:")
    const processedData = await processJson(jsonData)
    console.timeEnd("parse-took:")

    await saveToJsonFile(processedData, outputFilePath)
  } catch (error) {
    console.error(error)
  }
}

main()
