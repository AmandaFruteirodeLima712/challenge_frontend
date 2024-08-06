import './CardProduto.css'


function CardProduto(props) {

    return (
        <>
            <div className='divCardProduto'>

                <div className='divInternaCardProduto'>

                    <div className='divTodasInfosProduto'>
                        
                        <img className='imgProduto' src={props.imagem} alt={props.title} />

                        <div className='divInfosProduto'>

                            <div className='divPrecoStatusProduto'>

                                <div className="divPreco">${props.preco}</div>
                                <img className='imgStatusDisponivel' src={props.imagemStatusDisponibilidade} alt="Imagem de status disponível" />

                            </div>

                            <div className='divNomeQuantidade'>

                                <div>{props.produto}</div>
                                <div>Estoque: {props.available_quantity}</div>

                            </div>

                        </div>

                    </div>


                    <div className='divLocalizacao'>{props.localizacao}</div>
                    
                </div>



            </div>
        </>
    )
}

export default CardProduto