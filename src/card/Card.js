import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const pokeBallUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'

const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  border-radius: 16px;
  width: 312px;
  margin: auto;
`

const TopHalf = styled.div`
  background-color: #69b9e3;
  height: 200px;
  padding: 0 10px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BottomHalf = styled.div`
  background-color: #fff;
  margin-top: -30px;
  padding: 30px 15px 15px 15px;
  border-radius: 8px 8px 16px 16px;
  min-height: 300px;
`

const Heading = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`

const SubHeading = styled.div`
  width: 100%;
  height: 50px;
  color: #fff;
  p {
    margin-top: 0;
  }
`

const Name = styled.span`
  text-transform: capitalize;
`

const Image = styled.img`
  height: 150px;
`

const Stats = styled.div`
  display: flex;
  justify-content: center;
  p {
    margin 0 5px;
  }
`
const Types = styled.div`
  text-align: center;
  text-transform: capitalize;
`

const Loading = styled.div`
  text-align: center;
`

const Pokeball = styled.img`
  height: 50px;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
      from { -webkit-transform: rotate(0deg); }
      to { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }
`

const Card = ({ pokemon, loading }) => {
  const {
    name,
    evolvesFrom,
    generation,
    image,
    height,
    weight,
    types,
    moves,
    flavourText
  } = pokemon || {}

  const makeList = arrayOfStrings => {
    return arrayOfStrings.join(', ')
  }

  const getMoves = () => {
    return Object.keys(moves).map(
      pp => <li key={pp}>{pp}: {makeList(moves[pp])}</li>
    )
  }

  return (
    <CardContainer>
      <TopHalf>
        {!loading &&
          <>
            <Heading>
              <h1>
                <Name>{name}</Name>
              </h1>
              <p>
                <Name>{generation}</Name>
              </p>
            </Heading>
            <SubHeading>
              {evolvesFrom &&
                <p>
                  (evolves from <Name>{evolvesFrom}</Name>)
                </p>
              }
            </SubHeading>
            <Image alt={`A forward facing ${name}`} src={image} />
          </>
        }
      </TopHalf>
      <BottomHalf>
        {loading ? (
          <Loading>
            <Pokeball
              alt="Poke-ball"
              src={pokeBallUrl}
            />
            <p>Loading...</p>
          </Loading>
        ) : (
          <>
            <Stats>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </Stats>
            <Types>
              <p>
                {makeList(types)}
              </p>
            </Types>
            <p><i>{flavourText}</i></p>
            <ul>
              {getMoves()}
            </ul>
          </>
        )}
      </BottomHalf>
    </CardContainer>)
}

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    evolvesFrom: PropTypes.string,
    generation: PropTypes.string,
    image: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    types: PropTypes.array,
    moves: PropTypes.object,
    flavourText: PropTypes.string,
  }),
  loading: PropTypes.bool,
}

export default Card
