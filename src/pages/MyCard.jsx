import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import start_ppussung from '../assets/start_ppussung.svg';

const MyCard = () => {
  const [card, setCard] = useState({});
  const [isCardEmpty, setIsCardEmpty] = useState(true);

  useEffect(() => {
    const savedCard = localStorage.getItem('card');
    if (savedCard) {
      setCard(JSON.parse(savedCard));
      setIsCardEmpty(false);
    }
  }, []);

  return (
    <>
      <Header />
      {isCardEmpty ? (
        <>
          <h4> 매번 똑같은 자기소개에 질렸다면? </h4>
          <img src={start_ppussung} alt="" />

          <Button
            text="나를 친구에게 소개하기"
            showImg={true}
            color="#ab9fed"
            link="/edit"
          ></Button>
        </>
      ) : (
        <>
          <Card>
            {Object.keys(card).map((key) => (
              <TextBox key={key}>
                <Text> {key}&nbsp; </Text>
                {key === 'Drink'
                  ? `${parseInt(card[key])}병 ${(card[key] - parseInt(card[key])) * 8}잔`
                  : card[key]}
                {key === 'St_ID' && <>학번</>}
              </TextBox>
            ))}
          </Card>
        </>
      )}
    </>
  );
};

export default MyCard;

const Card = styled.div`
  border: 1px solid;
`;

const TextBox = styled.div`
  line-height: 3rem;
`;

const Text = styled.p`
  display: inline;
  font-weight: 500;
  font-size: 1rem;
`;
