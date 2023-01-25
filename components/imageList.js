import Styles from './characterList.module.css'
import Link from "next/link"

export default function imageList ({ list }) {
    return (
        <ul className="flexList">
        {list.map((object, i) => (
            <li key={i} className="flexItemSmall">
                <Link href={`/characters/${object.url}`}>
                    <div className="flexItemSmallImgContainer">
                        <img width="80" height="80" loading="lazy" src={`/images/characters/${object.img}.webp`} alt={object.name}/>
                    </div>
                    <p>{object.name}</p>
                </Link>
            </li>
        ))}
    </ul>
    )
}