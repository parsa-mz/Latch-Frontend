import React from 'react';
import { Typography, Box, List, ListItem, Paper } from '@mui/material';

// Function to render text with optional styles
const renderText = (element) => {
  const style = {};

  // console.log(element);

  if (element.color) {
    const rgbValues = element.color.match(/\d+/g);
    style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
    style.color = 'white';
    style.borderRadius = '5px';
    style.padding = '2px';
    return (
      <span style={style}>
        {element.value}
      </span>
    );
  }
  else {
    if (element.bold) {
      style.fontWeight = 'bold';
    }
    if (element.underline) {
      style.textDecoration = 'underline';
    }
    // if there is \n in the text, replace it with <br>
    // Check for both element.text and \n before attempting to process:
    if (element.text) {
      return (
        <span style={style}>
          {element.text.split('\n').map((line, key) => (
            <React.Fragment key={key}>
              {line.split(' ').map((word, wordKey) => (
                <React.Fragment key={wordKey}>
                  {wordKey > 0 && '\u00A0'}{/* This adds a space before every word except the first one in a line */}
                  {word}
                </React.Fragment>
              ))}
              {key < element.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      );
    }


    return (
      <span style={style}>
        {element.text}
      </span>
    );
  }

};

// Function to recursively render elements based on their type
const renderElement = (element) => {
  if (element.type) {
    switch (element.type) {
      case 'h1':
        return <Typography variant="h3">{element.children.map(renderText)}</Typography>;
      case 'p':
        return (
          <Typography paragraph>
            {element.children.map((child, index) => (
              <React.Fragment key={index}>{renderText(child)}</React.Fragment>
            ))}
          </Typography>
        );
      case 'mention':
        return <span style={{ color: element.color }}>{element.children.map(renderText)}</span>;
      case 'ul':
        return (
          <List sx={{ listStyleType: 'disc', marginLeft: '20px'}}>
            {element.children.map((item, index) => (
              <ListItem key={index} sx={{ display: 'list-item' }}>
                {item.children.map((child, childIndex) => renderElement(child))}
              </ListItem>
            ))}
          </List>
        );
      case 'block':
      case 'clause':
        return (
          <Box marginY={2}>
            {element.children.map((child, index) => (
              <React.Fragment key={index}>{renderElement(child)}</React.Fragment>
            ))}
          </Box>
        );
      default:
        return element.children?.map((child, index) => (
          <React.Fragment key={index}>{renderText(child)}</React.Fragment>
        ));


    }
  }
  return null;
};

const ContractComponent = (props) => {
  return (
    <Paper elevation={3} sx={{ padding: 4, margin: '20px', maxWidth: '1000px', mx: 'auto' }}>
      {props.jsonData.map((section, index) => (
        <Box key={index} mb={2}>
          {section.children.map((element, elementIndex) => renderElement(element))}
        </Box>
      ))}
    </Paper>
  );
};

export default ContractComponent;
