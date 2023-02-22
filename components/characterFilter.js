"use client"
import Styles from './characterlist.module.css'
import Link from "next/link"

export default function Filter ({ view, filters, changeView, changeFilters, options }) {
    return (
        <>
            <div className={`${Styles.filterContainer}`}>
                {changeView &&
                    <div className={Styles.buttonList}>
                        <button className={(view==0) ? Styles.active : ""} onClick={ () => changeView(0) }>Image View</button>
                        <button className={(view==1) ? Styles.active : ""} onClick={ () => changeView(1)} >List View</button>
                    </div>
                }
                <div className={Styles.buttonList}>
                    <button className={(filters.burst=="") ? Styles.active : ""} onClick={ () => changeFilters("burst", "") }>
                        <span>All</span>
                    </button>
                    <button className={(filters.burst=="1") ? Styles.active : ""} onClick={ () => changeFilters("burst", "1") }>
                        <img alt="Burst 1" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_burst_1.webp`} />
                    </button>
                    <button className={(filters.burst=="2") ? Styles.active : ""} onClick={ () => changeFilters("burst", "2") }>
                        <img alt="Burst 2" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_burst_2.webp`} />
                    </button>
                    <button className={(filters.burst=="3") ? Styles.active : ""} onClick={ () => changeFilters("burst", "3") }>
                        <img alt="Burst 3" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_burst_3.webp`} />
                    </button>
                </div>
                <div className={Styles.buttonList}>
                    <button className={(filters.class=="") ? Styles.active : ""} onClick={ () => changeFilters("class", "") }>
                        <span>All</span>
                    </button>
                    <button className={(filters.class=="attacker") ? Styles.active : ""} onClick={ () => changeFilters("class", "attacker") }>
                        <img alt="Attacker" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_class_attacker.webp`} />
                    </button>
                    <button className={(filters.class=="supporter") ? Styles.active : ""} onClick={ () => changeFilters("class", "supporter") }>
                        <img alt="Supporter" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_class_supporter.webp`} />
                    </button>
                    <button className={(filters.class=="defender") ? Styles.active : ""} onClick={ () => changeFilters("class", "defender") }>
                        <img alt="Defender" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_class_defender.webp`} />
                    </button>
                </div>
                <div className={Styles.buttonList}>
                    <button className={(filters.weapon=="") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "") }>
                        <span>All</span>
                    </button>
                    <button className={(filters.weapon=="ar") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "ar") }>
                        <img alt="Assault Rifle" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_weapon_ar.webp`} />
                    </button>
                    <button className={(filters.weapon=="sr") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "sr") }>
                        <img alt="Sniper Rifle" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_weapon_sr.webp`} />
                    </button>
                    <button className={(filters.weapon=="sg") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "sg") }>
                        <img alt="Shotgun" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_weapon_sg.webp`} />
                    </button>
                    <button className={(filters.weapon=="smg") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "smg") }>
                        <img alt="SMG" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_weapon_smg.webp`} />
                    </button>
                    <button className={(filters.weapon=="rl") ? Styles.active : ""} onClick={ () => changeFilters("weapon", "rl") }>
                        <img alt="Rocket Launcher" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_weapon_rl.webp`} />
                    </button>
                </div>
                <div className={Styles.buttonList}>
                    <button className={(filters.element=="") ? Styles.active : ""} onClick={ () => changeFilters("element", "") }>
                        <span>All</span>
                    </button>
                    <button className={(filters.element=="wind") ? Styles.active : ""} onClick={ () => changeFilters("element", "wind") }>
                        <img alt="Wind" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_element_wind.webp`} />
                    </button>
                    <button className={(filters.element=="electric") ? Styles.active : ""} onClick={ () => changeFilters("element", "electric") }>
                        <img alt="Electricity" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_element_elect.webp`} />
                    </button>
                    <button className={(filters.element=="fire") ? Styles.active : ""} onClick={ () => changeFilters("element", "fire") }>
                        <img alt="Fire" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_element_fire.webp`} />
                    </button>
                    <button className={(filters.element=="iron") ? Styles.active : ""} onClick={ () => changeFilters("element", "iron") }>
                        <img alt="Iron" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_element_iron.webp`} />
                    </button>
                    <button className={(filters.element=="water") ? Styles.active : ""} onClick={ () => changeFilters("element", "water") }>
                        <img alt="Water" width="20" height="20" className={Styles.img} src={`https://db.nikke.gg/images/icon/icn_element_water.webp`} />
                    </button>
                </div>
                {Object.entries(filters).map(([key, value]) => {
                    if (key == "manufacturer") {
                        return (
                            <div key={key}>
                                <select onChange={(e) => changeFilters(key, e.target.value) } name={key} id={key}>
                                    <option value="">Any {key}</option>
                                    {options[key].map((option,index) => (
                                    <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}