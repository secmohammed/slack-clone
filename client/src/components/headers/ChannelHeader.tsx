import React from "react";

import { HeaderWrapper } from "../partials/styles/header";
import { Header } from "semantic-ui-react";

export default ({ channelName }: { channelName: string }) => (
    <HeaderWrapper>
        <Header textAlign="center">{channelName}</Header>
    </HeaderWrapper>
);
