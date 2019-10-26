import styled from "styled-components";
export const TeamWrapper = styled.div`
    grid-column: 1;
    grid-row: 1 / 4;
    background-color: #362234;
`;
export const TeamList = styled.ul`
    width: 100%;
    padding-left: 0px;
    list-style: none;
`;
export const TeamListItem = styled.li`
    height: 50px;
    width: 50px;
    background-color: #676066;
    color: #fff;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    border-radius: 11px;
    justify-content: center;
    font-size: 24px;
    &:hover {
        border-style: solid;
        border-width: thick;
        border-color: #767676;
    }
`;
