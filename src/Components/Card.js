
export default function Card ({title, text, img, imgAlt}) {
    return(
        <div className="card">
            <h2>{title}</h2>
            <img src={img} alt={imgAlt} />
            <p>{text}</p>
        </div>
    )
}

