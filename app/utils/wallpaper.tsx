/*
"use client";

import React from "react";
import { SecondaryBtn } from "../clientComponents";
import { roadmap } from "./roadmap";

const GenerateWallpaperButton: React.FC = () => {
  const generateWallpaper = () => {
    // Sort the roadmap array based on the earliest date in their items
    const sortedRoadmap = roadmap.sort((a, b) => {
      const earliestA = a.items.reduce((earliest, current) =>
        new Date(current.date) < new Date(earliest.date) ? current : earliest
      );
      const earliestB = b.items.reduce((earliest, current) =>
        new Date(current.date) < new Date(earliest.date) ? current : earliest
      );

      return (
        new Date(earliestA.date).getTime() - new Date(earliestB.date).getTime()
      );
    });

    // Sort the items within each roadmap by date
    sortedRoadmap.forEach((section) => {
      section.items.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });

    // Standard laptop screen dimensions
    const canvasWidth = 1920;
    const canvasHeight = 1080;

    // Margins
    const margin = 50; // Reduced margins to make more space
    const contentWidth = canvasWidth - margin * 2;
    const contentHeight = canvasHeight - margin * 2;

    // Variable number of columns based on content
    let columns = 2;
    const maxColumns = 4; // Maximum number of columns to try
    const gutter = 10; // Reduced gutter to make layout more compact
    let columnWidth = (contentWidth - (columns - 1) * gutter) / columns;

    // Create a temporary canvas for text measurement
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    let baseFontSize = 28; // Starting with a larger font size
    let fits = false;

    // Try increasing columns and adjusting font size until content fits
    while (!fits && columns <= maxColumns) {
      baseFontSize = 28; // Reset font size for each column count
      fits = false;

      while (!fits && baseFontSize >= 14) {
        // Reset column heights
        const yPositions = Array(columns).fill(0);

        // Set line height based on font size
        const lineHeight = baseFontSize * 1.2;

        // Function to measure text in columns
        const measureTextInColumn = (
          text: string,
          columnIndex: number,
          fontSize: number,
          fontWeight: string = "normal",
          textDecoration: string = "none"
        ) => {
          tempCtx.font = `${fontWeight} ${fontSize}px Arial`;
          tempCtx.textDecoration = textDecoration;
          const words = text.split(" ");
          let line = "";
          let y = yPositions[columnIndex];

          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = tempCtx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > columnWidth && n > 0) {
              // Line breaks
              y += lineHeight;
              line = words[n] + " ";
            } else {
              line = testLine;
            }
          }
          y += lineHeight; // Add for the last line
          yPositions[columnIndex] = y;
        };

        // Simulate text rendering to measure heights
        let columnIndex = 0;
        sortedRoadmap.forEach((section) => {
          // Measure section title
          measureTextInColumn(
            section.title,
            columnIndex,
            baseFontSize + 4,
            "bold"
          );
          // Measure section description
          measureTextInColumn(section.desc, columnIndex, baseFontSize);

          // Measure items
          section.items.forEach((item) => {
            const itemText = `${item.date} - ${item.title}`;
            measureTextInColumn(
              "• " + itemText,
              columnIndex,
              baseFontSize - 2,
              "normal",
              item.done ? "line-through" : "none"
            );
          });

          // Add spacing after section
          yPositions[columnIndex] += lineHeight * 2;

          // Move to next column
          columnIndex = (columnIndex + 1) % columns;
        });

        // Check if any column exceeds the content height
        fits = yPositions.every((height) => height + margin <= contentHeight);

        if (!fits) {
          baseFontSize -= 2; // Decrease font size
        }
      }

      if (!fits) {
        // Increase the number of columns and recalculate columnWidth
        columns += 1;
        columnWidth = (contentWidth - (columns - 1) * gutter) / columns;
      }
    }

    if (!fits) {
      alert("Content does not fit within the canvas dimensions.");
      return;
    }

    // Now we have a font size and column count that fits
    // Proceed to create the canvas and draw the text

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dark mode background
    ctx.fillStyle = "#1e1e1e"; // Dark gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set initial positions
    const xPositions: number[] = [];
    for (let i = 0; i < columns; i++) {
      xPositions.push(margin + i * (columnWidth + gutter)); // x positions for each column
    }
    const yPositions = Array(columns).fill(margin); // y positions for each column

    // Set text styles
    const lineHeight = baseFontSize * 1.2;

    ctx.fillStyle = "#ffffff"; // Light text color
    ctx.textBaseline = "top";

    // Function to wrap and draw text in columns
    const drawTextInColumn = (
      text: string,
      columnIndex: number,
      fontSize: number,
      fontWeight: string = "normal",
      textDecoration: string = "none"
    ) => {
      ctx.font = `${fontWeight} ${fontSize}px Arial`;
      ctx.fillStyle = "#ffffff";
      const words = text.split(" ");
      let line = "";
      let y = yPositions[columnIndex];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > columnWidth && n > 0) {
          if (textDecoration === "line-through") {
            drawLineThroughText(
              ctx,
              line,
              xPositions[columnIndex],
              y,
              fontSize
            );
          } else {
            ctx.fillText(line, xPositions[columnIndex], y);
          }
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      if (textDecoration === "line-through") {
        drawLineThroughText(ctx, line, xPositions[columnIndex], y, fontSize);
      } else {
        ctx.fillText(line, xPositions[columnIndex], y);
      }
      y += lineHeight;
      yPositions[columnIndex] = y; // Update the y position
    };

    // Function to draw text with strikethrough
    const drawLineThroughText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      fontSize: number
    ) => {
      ctx.fillText(text, x, y);
      const textWidth = ctx.measureText(text).width;
      const lineY = y + fontSize / 2;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, lineY);
      ctx.lineTo(x + textWidth, lineY);
      ctx.stroke();
    };

    // Draw the text
    let columnIndex = 0;
    sortedRoadmap.forEach((section) => {
      // Draw section title
      drawTextInColumn(section.title, columnIndex, baseFontSize + 4, "bold");
      // Draw section description
      drawTextInColumn(section.desc, columnIndex, baseFontSize);

      // Draw items
      section.items.forEach((item) => {
        const itemText = `${item.date} - ${item.title}`;
        drawTextInColumn(
          "• " + itemText,
          columnIndex,
          baseFontSize - 2,
          "normal",
          item.done ? "line-through" : "none"
        );
      });

      // Add spacing after section
      yPositions[columnIndex] += lineHeight * 2;

      // Move to next column
      columnIndex = (columnIndex + 1) % columns;
    });

    // Convert to data URL and download
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "roadmap_wallpaper.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SecondaryBtn onClick={generateWallpaper}>
      Download Roadmap Wallpaper
    </SecondaryBtn>
  );
};

export default GenerateWallpaperButton;
*/
