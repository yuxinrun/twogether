"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

export default function EChart({
  option,
  height = 360,
  className,
}: {
  option: EChartsOption;
  height?: number;
  className?: string;
}) {
  return (
    <ReactECharts
      option={option}
      style={{ height, width: "100%" }}
      className={className}
      notMerge
      lazyUpdate
      opts={{ renderer: "svg" }}
    />
  );
}
