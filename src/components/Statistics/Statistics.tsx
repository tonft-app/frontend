import React, { useEffect, useState } from "react";
import { StatisticsWrapper, WidgetWrapper, WidgetTitle, WidgetSubtitle } from "./StatisticsStyles";

interface StatisticsProps {
    volume: string;
    savedFees: string;
    mb?: string;
    mt?: string;
}


export const Statistics = ({ volume, savedFees, mb, mt}: StatisticsProps) => {

    return (
        <StatisticsWrapper mb={mb} mt={mt}>
            <WidgetWrapper mr="1" flex={1.4}>
                <WidgetTitle >Sold Amount</WidgetTitle>
                <WidgetSubtitle>{volume} TON</WidgetSubtitle>

            </WidgetWrapper>
            <WidgetWrapper ml="1" flex={1}>
                <WidgetTitle>Saved Fees</WidgetTitle>
                <WidgetSubtitle>{savedFees} TON</WidgetSubtitle>
            </WidgetWrapper>
        </StatisticsWrapper>
    )
} 