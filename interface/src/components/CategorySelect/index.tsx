import { useState } from "react"

type propsModel = {
    categories: string[]
    onChange: (category: string) => void 
    className?: string
    initialValue?: string
}

export default function CategorySelect(props: propsModel) {
    const [selectedValue, setSelectedValue] = useState(
        props.initialValue ?? props.categories[0]
    )
    return (
        <select 
            className={`
                text-center 
                bg-deep-night-blue 
                rounded-lg 
                text-md
                ${props.className ?? ''}
            `}
            value={selectedValue}
            onChange={(e) => {
                props.onChange(e.target.value)
                setSelectedValue(e.target.value)
            }}
        >
            {props.categories.map((category) => {
                return (
                    <option value={category}>
                        {category}
                    </option>
                )
            })}
        </select>
    )
}