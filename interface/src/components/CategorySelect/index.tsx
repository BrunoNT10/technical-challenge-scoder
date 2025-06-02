type propsModel = {
    categories: string[]
    onChange: (category: string) => void
    className: string
}

export default function CategorySelect(props: propsModel) {
    return (
        <select 
            className={`
                text-center 
                bg-navy-midnight 
                rounded-lg 
                ${props.className}
            `}
            onChange={(e) => props.onChange(e.target.value)}
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