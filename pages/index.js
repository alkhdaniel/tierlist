import Link from "next/link"
import CharacterFilter from "/components/characterFilter"
import ImageList from "/components/imageList"
import TableList from "/components/tableList"
import { useState, useEffect } from "react"


export default function Home() {
  const [tierlist, setTierlist] = useState(null)
  const [sortedCharacters, setSortedCharacters] = useState(null)
  const [filteredCharacters, setFilteredCharacters] = useState(null)
  const [view, setView] = useState(0)                                                 //0 = default view, 1 = list view
  const [filters, setFilters] = useState({weapon: "", class:"", burst:""})
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
            console.log(tierlist)
            const sorted = [...tierlist].sort((a, b) => (a[sorter] > b[sorter]) ? -1*ascending : ((b[sorter] > a[sorter]) ? 1*ascending : 0))
            setSortedCharacters(sorted)
          }
      }, [sorter, ascending]);

      useEffect(() => {
          if (!isLoading) {
            let filtered = sortedCharacters;
            console.log(filtered)
            filters.weapon ? filtered = filtered.filter(character => character.weapon.toLowerCase() == filters.weapon) : "";
            filters.class ? filtered = filtered.filter(character => character.class.toLowerCase() == filters.class) : "";
            filters.burst ? filtered = filtered.filter(character => character.burst.toLowerCase() == filters.burst) : "";
            setFilteredCharacters(filtered)
          }
      }, [filters, sortedCharacters]);

  if (!isLoading) {
    return (
      <>
        <CharacterFilter view={view} filters={filters} changeView={changeView} changeFilters={changeFilters} />
        {view ?
          <TableList list={filteredCharacters} fields={tableFields} changeSort={changeSort} imgfolder="characters" linkpath="characters" /> :
          <ImageList list={filteredCharacters} imgfolder="characters" linkpath="characters" />
        }
      </>
    )
  }
  if (isLoading) {
    return "loading..."
  }
}
