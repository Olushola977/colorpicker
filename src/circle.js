

const Circle = ({ bg, id, ...rest }) => {
    return (
        <div
            id={id}
            style={{
                background: `${bg}`
            }}
            {...rest}
            className="colorCircle mx-auto px-1 py-4"
        >
            <p className="">{bg}</p>
        </div>
    )
}

export default Circle;