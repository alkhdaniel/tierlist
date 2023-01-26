import Styles from './characterList.module.css'
import Link from "next/link"

export default function imageTierList ({ list }) {
	return (
		<div>
    		{Object.keys(list).map(function(tier, index) {
                return (
                	<div key={index} className={Styles.tierTable}>
                		<div className={Styles.tierTag}>{tier}</div>
	                	<ul className={`${Styles.tierContainer} flexList elevation1`}>
	                		{list[tier].map((character) => (
					            <li key={character.id} className={`flexItemSmall ${Styles.tooltip}`}>
						            <Link href={`/characters/${character.url}`}>
					                    <div className="flexItemSmallImgContainer">
                                <img width="64px" height="64px" loading="lazy" src={`/images/characters/${character.img}.webp`} alt={character.name} />
					                    </div>
					                    {/*<div className={Styles.line}></div>*/}
					                    <p>{character.name}</p>
					                </Link>
					                <div className={Styles.tooltipelement}>
                            <div className={Styles.tooltipCaption}>Rating</div>
                              <div className={Styles.tooltipRow}><div>Rating</div><div><progress max="10" value={character["overall"]} className={Styles.progress} /></div></div>
                              <div className={Styles.tooltipRow}><div>Wave Clear</div><div><progress max="10" value={character["wave"]} className={Styles.progress} /></div></div>
                              <div className={Styles.tooltipRow}><div>Wave Boss</div><div><progress max="10" value={character["waveboss"]} className={Styles.progress} /></div></div>
                              <div className={Styles.tooltipRow}><div>Boss</div><div><progress max="10" value={character["interception"]} className={Styles.progress} /></div></div>
                              <div className={Styles.tooltipRow}><div>Arena</div><div><progress max="10" value={character["arena"]} className={Styles.progress} /></div></div>
					                </div>
					            </li>
				        	))}
	                	</ul>
	                </div>
                )
            })}
        </div>
        )
}