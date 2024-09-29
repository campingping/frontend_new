import styled from "styled-components";
import CommunityCategory from "./CommunityCategory";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import ico_member from "../../../assets/images/ico_member.png";
import ico_calendar from "../../../assets/images/ico_calendar2.png";
import ico_arrow_prev from "../../../assets/images/ico_arrow_prev.png";
import ico_arrow_next from "../../../assets/images/ico_arrow_next.png";
import ReplyBox from "./ReplyBox";
import { useUser } from "../../../hooks/useUser";

const Header = styled.div`
  padding: 85px 0 50px;
  text-align: center;
  border-bottom: 1px solid #000;
`;

const HeaderCate = styled.p`
  margin: 0;
  font-size: 16px;
`;

const HeaderTitle = styled.h3`
  margin: 20px 0 80px;
  font-size: 24px;
`;

const HeaderInfo = styled.p`
  font-size: 14px;
  color: #757575;
`;

const HeaderName = styled.span`
  padding-left: 15px;
  background: url(${ico_member}) no-repeat 0 50%;
`;
const HeaderDate = styled.span`
  position: relative;
  margin-left: 15px;
  padding-left: 15px;
  background: url(${ico_calendar}) no-repeat 0 50%;
  &:before {
    content: "";
    position: absolute;
    left: -7px;
    top: 50%;
    margin-top: -4px;
    width: 1px;
    height: 8px;
    background: #dadada;
  }
`;

const Contents = styled.div`
  padding: 50px 0;
`;



const Footer = styled.span`
  display: flex;
  height: 70px;
  font-size: 18px;
  line-height: 70px;
  border: 1px solid #000;
  border-width: 1px 0px;

  & > a {
    display: flex;
    padding: 0 30px;
    width: 50%;
    color: #757575;
    text-decoration: none;
    box-sizing: border-box;
  }

  .prev {
    border-right: 1px solid #000;
    .arrow {
      background: url(${ico_arrow_prev}) no-repeat 0 50%;
    }
  }

  .next {
    flex-direction: row-reverse;
    .arrow {
      background: url(${ico_arrow_next}) no-repeat 100% 50%;
    }

    .title {
      text-align: right;
    }
  }

  .arrow {
    padding: 0 30px;
    width: 120px;
    box-sizing: border-box;
  }

  .title {
    margin: 0;
    width: calc(100% - 120px - 30px);
    font-size: 18px;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => (props.delete ? '#e74c3c' : '#23489d')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? '#c0392b' : '#0056b3')};
  }
`;



const CommunityDetail = ({ data, link }) => {
  const date = new Date(data.createdAt)

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const { data: currentUser, error, isLoading } = useUser();
  const currentUserId = currentUser?._id

  return (
    <>
      <CommunityCategory />
      <Container>
        <Header>
          <HeaderCate>{data?.category}</HeaderCate>
          <HeaderTitle>{data?.title} </HeaderTitle>
          <HeaderInfo>
            <HeaderName>{data?.userId?.nickname}</HeaderName>
            <HeaderDate>{formattedDate}</HeaderDate>
          </HeaderInfo>
        </Header>

        <Contents><pre>{data?.content}</pre></Contents>


        {
          currentUserId == data.userId._id ?
            <ButtonContainer>
              <Link to={link + `/write`} id={data?.id}>
                수정
              </Link>
              <Button delete>
                삭제
              </Button>
            </ButtonContainer> : null
        }

        <ReplyBox currentUserId={currentUserId}/>
        <Footer>





          {/* {data?.prev && (
            <Link className="prev" to={link + `${data?.prev.id}`}>
              <span className="arrow">이전글</span>
              <p className="title">{data?.prev.title}</p>
            </Link>
          )}
          {data?.next && (
            <Link className="next" to={link + `${data?.next.id}`}>
              <span className="arrow">다음글</span>
              <p className="title">{data?.next.title}</p>
            </Link>
          )} */}
        </Footer>
      </Container>
    </>
  );
};
export default CommunityDetail;
