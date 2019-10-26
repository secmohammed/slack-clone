import styled from "styled-components";
export const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #4e3a4c;
    color: #958993;
`;
export const TeamNameHeader = styled.h1`
    color: #fff;
    font-size: 20px;
`;

export const ChannelSidebar = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;
const paddingLeft = "padding-left: 10px";
export const ChannelSidebarListItem = styled.li`
    padding: 2px;
    ${paddingLeft};
    &:hover {
        background: #3e313c;
    }
`;

export const ChannelSidebarListHeader = styled.li`
    ${paddingLeft};
`;
export const PushLeft = styled.div`
    ${paddingLeft};
`;

export const OnlineStatus = styled.span`
    color: #38978d;
`;
