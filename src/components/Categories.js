import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Categories = () => {
  const { categories } = useStaticQuery(graphql`
    query {
      categories: allWpCategory {
        nodes {
          name
          id
          uri
        }
      }
    }
  `)

  let regEx = /\/services\//
  let regEx1 = /\/industry\//
  let filteredCat = categories.nodes
    .filter(y => !y.uri.match(regEx))
    .filter(y => !y.uri.match(regEx1))
  let catCount = filteredCat.length
  let catRowSize = 4
  let catColumnSize = 2
  let rowOverage = 0

  if (catCount > catRowSize * catColumnSize) {
    rowOverage = catCount - catRowSize * catColumnSize
    catRowSize = Math.trunc(catRowSize + Math.ceil(rowOverage / catColumnSize))
  }

  let catComponent = renderCategory()

  function renderCategory() {
    let catGroups = groupBy(catRowSize, filteredCat)
    return (
      <ul className="flex text-sm w-100 gap-x-6 font-Montserrat text-themeOrange-400">
        {catGroups.map(renderRow)}
      </ul>
    )
  }

  function renderRow(group, index) {
    return (
      <li key={`group-${index}`}>
        <ul className="list-disc text-themeBlue-600">
          {group.map(renderColumn)}
        </ul>
      </li>
    )
  }

  function renderColumn(cat, index) {
    return (
      <li key={cat.id + index} className="pb-3">
        <Link
          to={`${cat.uri.replace("/blog", "")}`}
          className="text-sm font-semibold font-Montserrat text-themeOrange-400"
        >
          {cat.name}
        </Link>
      </li>
    )
  }

  function groupBy(amountOfItemsPerGroup, items) {
    var groups = [],
      group,
      total = items.length
    for (var i = 0; i < total; i += amountOfItemsPerGroup) {
      group = items.slice(i, i + amountOfItemsPerGroup)
      groups.push(group)
    }
    return groups
  }

  return (
    <div className="category">
      <h3 className="py-5 text-lg font-bold font-Montserrat text-themeBlue-600">
        Categories
      </h3>
      {catComponent}
    </div>
  )
}

export default Categories
