import styled from "styled-components";

export const Wrapper = styled.span`
  margin-right: 0.75rem;
  // flex-grow: 1;
  flex-shrink: 1;
  white-space: normal;
  white-space: normal;
  @media (min-width: 1040px) {
    white-space: nowrap;
  }
`;

export const WrapperCommand = styled.span`
  margin-right: 0.75rem;`;

  
export const WebsiteName = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

export const User = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
`;

export const CatBlue = styled.span`
  color: #89DCEB;
`;

export const CatRed = styled.span`
  color: #F38BA8;
`;

export const CatOrange = styled.span`
  color: #FAB387
`

export const CatLavender = styled.span`
  color: #B4BEFE
`

export const PrevCommand = styled.span`
  color: #B4BEFE;
  text-overflow:ellipsis;
`
