import React, { useState, useEffect} from 'react';
import html2canvas from 'html2canvas';

const Imgmemes = () => {
    const [textoSuperior, setTextoSuperior] = useState();
    const [textoMedio, setTextoMedio] = useState();
    const [textoInferior, setTextoInferior] = useState();
    const [textoColor, setTextoColor] = useState();

    const [imgMeme, setImgMeme] = useState('../images/empty.png');
    const [imagenes, setImagenes] = useState([]);

    const URL = 'https://api.imgflip.com/get_memes';

    //--
    const textSupMeme = (e) => {
        setTextoSuperior(e.target.value);
    }
    const textMedMeme = (e) => {
        setTextoMedio(e.target.value);
    }
    const textInfMeme = (e) => {
        setTextoInferior(e.target.value);
    }
    //--
    const seleccionarImg = (e) => {
        let imagen = imagenes.find((img)=>{return img.id === e.target.value});
        setImgMeme(imagen.url)
    }
    const seleccionarColor = (e) => {
        setTextoColor(e.target.value)
    }

    useEffect(() => {
        fetch(URL)
            .then(data => data.json())
            .then(json => setImagenes(json.data.memes))
        }
    );

    const descarga = (e) => {
        html2canvas(document.querySelector('#exportar'), { useCORS: true }).then(function(canvas) {
            // document.body.appendChild(canvas);
            let img = canvas.toDataURL('memesImg/png');
            let link = document.createElement("a");
            link.download = "memepropio.png";
            link.href = img;
            link.click();
        });
    }

    return (
    <div className='text-center'>
        <h1 className='mt-3 mb-3 text-light'>Creá tu propio meme</h1>

        <div className='row'>
            <div className='col-12 col-sm-6'>
                <h3 className='mt-2 mb-3'>Escribí tu ingeniosa frase</h3>
                <textarea onChange={textSupMeme} className="form-control w-75 m-auto d-block mb-2" placeholder="Texto superior"></textarea>
                <textarea onChange={textMedMeme} className="form-control w-75 m-auto d-block mb-2" placeholder="Texto medio"></textarea>
                <textarea onChange={textInfMeme} className="form-control w-75 m-auto d-block mb-2" placeholder="Texto inferior"></textarea>

                <h3 className='mt-2 mb-3'>Elegí un color para el texto</h3>
                <input onChange={seleccionarColor} type="color" className="m-auto form-control form-control-color" id="color"></input>

                <h3 className='mt-2 mb-3'>Elegí la imagen para tu meme</h3>
                <select onChange={seleccionarImg} className="form-select form-select-lg mb-3 w-75 m-auto" aria-label="Default select example">
                    <option>Selecciona una imagen</option>
                    {imagenes.map((img) => (
                    <option key={img.id} value={img.id}>{img.name}</option>
                    ))}                    
                </select> 
            </div>
            <div className='col-12 col-sm-6'>
                <figure id="exportar" className="position-relative">
                    <div>
                        <pre className='w-100 position-absolute top-0 h1 text-center' style={{ "color": `${textoColor}`}}>{textoSuperior}</pre>
                        <pre className='w-100 position-absolute top-50 h1 translate-middletext-center' style={{ "color": `${textoColor}`}}>{textoMedio}</pre>
                        <pre className='w-100 position-absolute bottom-0 h1 text-center' style={{ "color": `${textoColor}`}}>{textoInferior}</pre>
                        <img src={imgMeme} className='figure-img img-fluid' alt='meme'/>
                    </div>
                </figure>
                <button type='button' onClick={descarga} className='btn btn-primary mt-4 mb-4'>Descargá tu meme</button>
            </div>
        </div>

    </div>
    )
}

export default Imgmemes;