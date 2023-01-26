"use client"
import Styles from './characterList.module.css'
import Link from "next/link"

export default function tableList ({ list, fields, changeSort }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className={Styles.tableImg}></th>
                    {fields.map((field, i) => (
                    	<th key={i} className={Styles.noselect} onClick={ () => changeSort(field.value)}>{field.name}</th>
                	))}
                </tr>
            </thead>
            <tbody>
            {list.map((object) => (
                <tr key={object.id}>
                    <td className={Styles.trImg}><img width="40" height="40" loading="lazy" src={`https://db.nikke.gg/images/characters/${object.img}.webp`} alt={object.name}/></td>
                    {fields.map((field, i) => (
                    	<>
                    	{field.value == "name" ? 
	                    	<td className={Styles.trName}>
		                        <div className={Styles.tooltip}>
                                    <img alt="Weapon" width="20" height="20" loading="lazy" src={`https://db.nikke.gg/images/icon/icn_weapon_${object.weapon.toLowerCase()}.webp`} />
		                            <div className={Styles.tooltipelementSmall}>{object.weapon}</div>
		                        </div>
		                        <div className={Styles.tooltip}>
		                            <img alt="Class" width="20" height="20" loading="lazy" src={`https://db.nikke.gg/images/icon/icn_class_${object.class.toLowerCase()}.webp`} />
		                            <div className={Styles.tooltipelementSmall}>{object.class}</div>
		                        </div>
		                        <div className={Styles.tooltip}>
		                            <img alt="Burst" width="20" height="20" loading="lazy" src={`https://db.nikke.gg/images/icon/icn_burst_${object.burst.toLowerCase()}.webp`} />
		                            <div className={Styles.tooltipelementSmall}>Burst {object.burst}</div>
		                        </div>
		                        <Link href={`/characters/${object.url}`}><span>{object.name}</span></Link>
		                    </td>
		                    :
		                    <td>{object[field.value]}</td>
                    	}
                    	</>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}