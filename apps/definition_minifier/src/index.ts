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
  } 
  catch (error) {
    console.error(error)
  }
}

main()
