import Link from "next/link"
import CharacterFilter from "/components/characterFilter"
import ImageTierList from "/components/imageTierList"
import TableList from "/components/tableList"
import { useState, useEffect } from "react"


export default function Home() {
  const [tierlist, setTierlist] = useState(null)
  const [sortedCharacters, setSortedCharacters] = useState(null)
  const [filteredCharacters, setFilteredCharacters] = useState(null)
  const [view, setView] = useState(0)                                                 //0 = default view, 1 = list view
  const [filters, setFilters] = useState({weapon: "", class:"", burst:"", element:"", manufacturer:""})
  const [sorter, setSorter] = useState("overall");
  const [ascending, setAscending] = useState(1);

  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
  fetch('https://db.nikke.gg/api/tierlist')
    .then((res) => res.json())
    .then((data) => {
      setTierlist(data)
      setSortedCharacters(data)
      setFilteredCharacters(data)
      setLoading(false)
    })
}, [])

    const options = {manufacturer: ["Missilis","Elysion","Tetra","Pilgrim","Abnormal"]}

    const tableFields = [
        {name: "Nikke", value:"name"}, 
        {name: "Overall", value:"overall"}, 
        {name: "Wave", value:"wave"}, 
        {name: "Wave Boss", value:"waveboss"}, 
        {name: "Interception", value:"interception"}, 
        {name: "Arena", value:"arena"}, 
    ]

    const changeView = (view) => {
        setView(view);
    }
    const changeFilters = async (filter, value) => {
        setFilters({...filters, [filter]: value});
    }

    const changeSort = async (sortProperty) => {
        (sorter == sortProperty) ? setAscending(ascending*-1) : setAscending(1);
        setSorter(sortProperty)
    }

      useEffect(() => {
          if (!isLoading) {
            const sorted = [...tierlist].sort((a, b) => (a[sorter] > b[sorter]) ? -1*ascending : ((b[sorter] > a[sorter]) ? 1*ascending : 0))
            setSortedCharacters(sorted)
          }
      }, [sorter, ascending]);

      useEffect(() => {
          if (!isLoading) {
            let filtered = sortedCharacters;
            filters.weapon ? filtered = filtered.filter(character => character.weapon.toLowerCase() == filters.weapon) : "";
            filters.class ? filtered = filtered.filter(character => character.class.toLowerCase() == filters.class) : "";
            filters.burst ? filtered = filtered.filter(character => character.burst.toLowerCase() == filters.burst) : "";
            filters.element ? filtered = filtered.filter(character => character.element.toLowerCase() == filters.element) : "";
            filters.manufacturer ? filtered = filtered.filter(character => character.manufacturer == filters.manufacturer) : "";
            setFilteredCharacters(filtered)
          }
      }, [filters, sortedCharacters]);

  if (!isLoading) {
    const tierGrouping = {}
    tierGrouping.SSS = filteredCharacters.filter(char => char["overall"] > 9.5 && char["overall"] <= 10)
    tierGrouping.SS = filteredCharacters.filter(char => char["overall"] > 9 && char["overall"] <= 9.5)
    tierGrouping.S = filteredCharacters.filter(char => char["overall"] > 8 && char["overall"] <= 9)
    tierGrouping.A = filteredCharacters.filter(char => char["overall"] > 7 && char["overall"] <= 8)
    tierGrouping.B = filteredCharacters.filter(char => char["overall"] > 6 && char["overall"] <= 7)
    tierGrouping.C = filteredCharacters.filter(char => char["overall"] > 4 && char["overall"] <= 6)
    tierGrouping.D = filteredCharacters.filter(char => char["overall"] > 2 && char["overall"] <= 4)
    tierGrouping.F = filteredCharacters.filter(char => char["overall"] < 2)
    return (
      <>
        <CharacterFilter view={view} filters={filters} changeView={changeView} changeFilters={changeFilters} options={options} />
        {view ?
          <TableList list={filteredCharacters} fields={tableFields} changeSort={changeSort} imgfolder="characters" linkpath="characters" /> :
          <ImageTierList list={tierGrouping} />
        }
      </>
    )
  }
  if (isLoading) {
    return "loading..."
  }
}
