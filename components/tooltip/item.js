"use client"

import Link from "next/link"
import useSWR from "swr"
import Styles from './tooltip.module.css'

const fetcher = (path) => fetch(`/api/items/${path}`).then((res) => res.json())

export default function ItemTooltip({children, itemName}) {
    const {data, error } = useSWR(itemName, fetcher)
    if (error) return <div>{children}</div>
    if (!data) return <div>{children}</div>
    return (
        <div className={Styles.tooltip}>
            <div>{children}</div>
            <div className={Styles.tooltipelement}>
                <img src={`/images/items/${data.img}.webp`} />
                <div>{data.name}</div>
                <div>{data.description}</div>
            </div>
        </div>
    )
}