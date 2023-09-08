import * as fs from "fs"

const apiUrl =
  "https://bungie.com/common/destiny2_content/json/en/DestinyInventoryItemDefinition-b83e6d2c-3ddc-42b6-b434-565c3dc82769.json"
const outputFilePath = "output.json"

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

function stripImageUrl(url: string): string {
  const index = url.lastIndexOf("/")
  const shortUrl = url.substring(index + 1)
  return shortUrl
}

function getRepeatStringIndex(name: RepeatStringsName, s: string): number {
  const index = repeatStrings[name].indexOf(s)
  if (index === -1) {
    repeatStrings[name].push(s)
    return getRepeatStringIndex(name, s)
  }

  return index
}

async function downloadJsonFile(url: string): Promise<any> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    throw new Error(`Failed to download JSON file: ${error}`)
  }
}

async function createMicroDefinition(fullItemDef: JSON): Promise<any> {
  const fullDef: { [key: string]: any } = {}
  // const itemDictionary = fullItemDef.toDictionary();

  for (const key in fullItemDef) {
  }
  // const i: Json = {};

  // const redacted = item.redacted;
  // if (redacted) {
  //   i.r = 1;
  // }

  // const displayProperties = item.displayProperties;
  // if (displayProperties) {
  //   const name = displayProperties.name.toString();
  //   if (name) {
  //     i.n = name;
  //   } else if (!redacted) {
  //     continue;
  //   }

  //   const description = displayProperties.description.toString();
  //   if (description) {
  //     i.d = getRepeatStringIndex(RepeatStringsName.Descriptions, description);
  //   }

  //   const icon = displayProperties.icon.toString();
  //   if (icon) {
  //     i.i = stripImageUrl(icon);
  //   }
  // }

  // ... (rest of the code)

  // fullDef[item.hash.toString()] = i;
  return fullDef
}

async function processJson(jsonData: any): Promise<any> {
  const processedData: { [key: string]: any } = {}

  for (const key in jsonData) {
    const item: any = {}
    if (jsonData.hasOwnProperty(key)) {
      // console.log(jsonData[key])

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

      

      if (Object.keys(item).length > 0) {
        processedData[key] = item // Assign 'item' directly to the key
      }
    }
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
    const jsonData = await downloadJsonFile(apiUrl)
    const processedData = await processJson(jsonData)
    await saveToJsonFile(processedData, outputFilePath)
  } catch (error) {
    console.error(error)
  }
}

main()
