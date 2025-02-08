import { colorResolver } from '@unocss/preset-mini/utils'
import { colors } from './unocss.config'

function flattenObj(ob, separator = '.') {
  const result = {}

  for (const i in ob) {
    if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i], separator)

      for (const j in temp)
        result[`${i}${separator}${j}`] = temp[j]
    }

    else { result[i] = ob[i] }
  }

  return result
}

export const preflightColors = {
  getCSS: ({ theme, generator }) => {
    const colorsFlat = flattenObj(colors, '-')

    const colorsName = Object.keys(colorsFlat)

    const bgColorsVars = colorsName.reduce<string[]>((acc, name) => {
      const bgObj = colorResolver('background-color', 'bg')([ '', name ], { theme, generator } as any)

      const bgObjKeys = Object.keys(bgObj || {})

      const bgValue = bgObj?.[bgObjKeys[1]] || bgObj?.[bgObjKeys[0]]

      acc.push(`  --color-${name}: ${bgValue};\n`)
      return acc
    }, [])

    const textColorsVars = colorsName.reduce<string[]>((acc, name) => {
      const bgObj = colorResolver('color', 'text')([ '', name ], { theme, generator } as any)

      const bgObjKeys = Object.keys(bgObj || {})

      const bgValue = bgObj?.[bgObjKeys[1]] || bgObj?.[bgObjKeys[0]]

      acc.push(`.text-${name} { --un-text-opacity: 1; color: ${bgValue}; }\n`)
      return acc
    }, [])

    return [ '* {\n', bgColorsVars.join(''), '}\n', textColorsVars.join('') ].join('')
  },
}
