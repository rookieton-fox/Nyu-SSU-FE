import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import EditInput from '../components/EditInput';
import RadioSelector from '../components/RadioSelector';
import Button from '../components/Button';
import Header from '../components/Header';
import AlcoholButton from '../components/AlcoholButton';
import ppussung from '../assets/ppussung.svg';
import ContentContainer from '../components/ContentContainer';
import MenuModal from '../components/MenuModal';

const EditCard = () => {
  const [isAgreed, setIsAgreed] = useState(false); // 체크박스 동의 여부
  const [openPolicyAndCaution, setOpenPolicyAndCaution] = useState(false);

  const prevCard = JSON.parse(localStorage.getItem('card'));

  const nameRef = useRef();
  const deptRef = useRef();
  const idRef = useRef();
  const mbtiRef = Array.from({ length: 4 }, () => useRef());
  const alcoholRef = useRef();

  const reversePolicyAndCaution = () => {
    setOpenPolicyAndCaution((prev) => !prev);
  };

  const emptyInputFocus = (targetRef) => {
    targetRef.current.style.border = '1px solid red';
    targetRef.current.focus();
  };

  const onSubmit = () => {
    const name = nameRef.current.value;
    const dept = deptRef.current.value;
    const id = idRef.current.value;
    const mbti = mbtiRef.map((r) => r.current.value).join('');
    const alcohol = alcoholRef.current.value / 100;

    if (name && dept && id) {
      localStorage.setItem(
        'card',
        JSON.stringify({
          Name: name,
          Major: dept,
          St_ID: id,
          MBTI: mbti,
          Drink: alcohol,
        }),
      );

      return true;
    } else {
      if (!name) emptyInputFocus(nameRef);
      if (!dept) emptyInputFocus(deptRef);
      if (!id) emptyInputFocus(idRef);

      return false;
    }
  };

  return (
    <>
      <Header />
      <ContentContainer>
        <EditInput
          target={'이름'}
          prevInput={prevCard && prevCard.Name}
          ref={nameRef}
          placeholder={'이름 (11자 이하, 특수문자 입력 가능)'}
        />
        <EditInput
          target={'학과'}
          prevInput={prevCard && prevCard.Major}
          ref={deptRef}
          placeholder={'학과 (11자 이하, 특수문자 입력 가능)'}
        />
        <EditInput
          target={'학번'}
          prevInput={prevCard && prevCard.St_ID}
          maxLength={2}
          ref={idRef}
          placeholder={'학번 (2자 이하, 숫자만 입력 가능)'}
        />
        <ItemBox>
          <span>MBTI</span>
          <MBTIBox>
            <RadioSelector
              optionA={'E'}
              optionB={'I'}
              ref={mbtiRef[0]}
              guideText={['외향', '내향']}
              prevInput={prevCard && prevCard.MBTI[0]}
            />
            <RadioSelector
              optionA={'S'}
              optionB={'N'}
              ref={mbtiRef[1]}
              guideText={['감각', '직관']}
              prevInput={prevCard && prevCard.MBTI[1]}
            />
            <RadioSelector
              optionA={'T'}
              optionB={'F'}
              ref={mbtiRef[2]}
              guideText={['사고', '감각']}
              prevInput={prevCard && prevCard.MBTI[2]}
            />
            <RadioSelector
              optionA={'J'}
              optionB={'P'}
              ref={mbtiRef[3]}
              guideText={['판단', '인식']}
              prevInput={prevCard && prevCard.MBTI[3]}
            />
          </MBTIBox>
        </ItemBox>
        <ItemBox>
          <span>주량</span>
          <AlcoholButton prevInput={prevCard && prevCard.Drink} ref={alcoholRef} />
        </ItemBox>
        <PolicyBox isagreed={isAgreed.toString()}>
          <div>
            <input
              type="checkbox"
              onChange={(e) => {
                setIsAgreed(e.target.checked);
              }}
            />
            <label isagreed={isAgreed.toString()}>
              <u onClick={reversePolicyAndCaution}>이용약관, 주의사항</u>을 확인했습니다.
            </label>
          </div>
          <img src={ppussung} alt="" />
        </PolicyBox>
        <Button
          text="내 소개 등록하기"
          color="#AB9FED"
          link="/"
          onSubmit={onSubmit}
          isDisabled={!isAgreed}
        />
        <CopyrightText> © 2023 Yourssu All rights reserved </CopyrightText>
        {openPolicyAndCaution && (
          <MenuModal title="warning" onClickClose={reversePolicyAndCaution}>
            만든 사람들
          </MenuModal>
        )}
      </ContentContainer>
    </>
  );
};

export default EditCard;

const MBTIBox = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ItemBox = styled.div`
  display: flex;
  font-weight: 700;

  span {
    margin-right: 22px;
  }
`;

const CopyrightText = styled.p`
  color: #a3a3a3;
  font-weight: 200;
  font-size: 6px;
`;

const PolicyBox = styled.div`
  width: 350px;
  display: flex;
  justify-content: flex-end;
  border: 1.5px dashed ${(props) => (props.isagreed === 'true' ? '#AB9FED' : '#A3A3A3')};
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }

  label {
    color: ${(props) => (props.isagreed === 'true' ? '#AB9FED' : '#A3A3A3')};
  }

  u {
    cursor: pointer;
  }
`;
