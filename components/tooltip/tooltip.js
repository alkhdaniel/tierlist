"use client"
import Link from "next/link"
import useSWR from "swr"
import Styles from './tooltip.module.css'
import { useState } from 'react';

const fetcher = (path) => fetch(`/api/${path}`).then((res) => res.json())

export default function Tooltip({children, category, item}) {
    const [url, setUrl] = useState(null);
    const [hidden, setHidden] = useState(1);
    const {data, error } = useSWR(url ? `${category}/${item}` : null, fetcher);

    if (error) return <span>Error</span>
    if (!data) return <span className={Styles.tooltipContainer} onMouseEnter={() => setHidden(0)} onMouseLeave={() => setHidden(1)}  onMouseOver={() => setUrl(1)}>{children}</span>

    return (
        <>
            <span className={Styles.tooltipContainer} onMouseEnter={() => setHidden(0)} onMouseLeave={() => setHidden(1)}>
                {children}
                {!hidden && renderSwitch(category, data)}
            </span>
        </>
  );
}

function renderSwitch(category, data) {
  switch(category) {
    case 'items':
      return itemTemplate(data);
    case 'characters':
      return characterTemplate(data);
  }
}

function itemTemplate(data) {
    return (
        <div className={Styles.tooltip}>
            <div className={Styles.theader}>{data.name}</div>
            <img className={Styles.timg} width="64px" height="64px" src={`/images/items/${data.img}.webp`} />
            <div>{data.description}</div>
        </div>
    )
}

function characterTemplate(data) {
    return (
        <div className={Styles.tooltip}>
            <div className={Styles.theader}>{data.name}</div>
            <img className={Styles.timg} width="64px" height="64px" src={`/images/characters/${data.img}.webp`} />
            <div>{data.description}</div>
        </div>
    )
}