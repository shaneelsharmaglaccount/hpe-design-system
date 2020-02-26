import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Keyboard,
  Layer,
  RadioButtonGroup,
  Stack,
  Text,
  ThemeContext,
} from 'grommet';
import { Contract, Desktop, Expand, FormDown, FormUp } from 'grommet-icons';
import Prism from 'prismjs';
import { IconMobile } from '../../components';

const syntax = {
  dark: styled.pre`
    background: transparent;
    .string {
      color: #6c9;
    }
    .keyword {
      color: #c9c;
    }
    .function {
      color: #f93;
    }
    .operator {
      color: #6cc;
    }
    .tag {
      color: #f66;
    }
    .script {
      color: #ccc;
    }
    .punctuation {
      color: #ccc;
    }
    .attr-name {
      color: #6c9;
    }
    .attr-value {
      color: #c9c;
    }
  `,
  light: styled.pre`
    background: transparent;
    .string {
      color: #690;
    }
    .keyword {
      color: #069;
    }
    .function {
      color: #c66;
    }
    .operator {
      color: #963;
    }
    .tag {
      color: #906;
    }
    .script {
      color: #333;
    }
    .punctuation {
      color: #999;
    }
    .attr-name {
      color: #690;
    }
    .attr-value {
      color: #069;
    }
  `,
};

export const Example = ({
  children,
  code,
  designer,
  docs,
  figma,
  template,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const [mobile, setMobile] = React.useState(false);
  const [showLayer, setShowLayer] = React.useState(false);
  const codeRef = React.useRef();

  React.useEffect(() => {
    if (open && !codeText) {
      setCodeText('loading');
      fetch(code)
        .then(response => response.text())
        .then(text => setCodeText(text));
    } else if (open && codeText) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, codeText, open, Syntax]);

  // Set the Syntax component after highlightElement. This will cause
  // highlightElement to be re-run when Sytanx changes. This is needed
  // so the styling change is rendered.
  React.useEffect(() => setSyntax(syntax[theme.dark ? 'dark' : 'light']), [
    theme.dark,
  ]);

  return (
    <Box margin={{ vertical: 'small' }}>
      <Box background="background-contrast" direction="row" justify="start">
        <RadioButtonGroup
          name="radio"
          direction="row"
          gap="none"
          options={['Desktop', 'Mobile']}
          value={mobile ? 'Mobile' : 'Desktop'}
          onChange={event => setMobile(event.target.value === 'Mobile')}
        >
          {(option, { checked, hover }) => {
            const Icon = option === 'Desktop' ? Desktop : IconMobile;
            let background;
            if (checked) background = 'brand';
            else if (hover) background = 'active-background';
            else background = undefined;
            return (
              <Box
                background={background}
                direction="row"
                pad="small"
                align="center"
                gap="small"
              >
                <Icon />
                <Text>{option}</Text>
              </Box>
            );
          }}
        </RadioButtonGroup>
        <Button
          icon={<Expand />}
          onClick={() => {
            setShowLayer(true);
          }}
          hoverIndicator
        />
      </Box>
      <Box
        direction="row"
        background="background-front"
        pad="large"
        // Height for template screen needs to be between medium and large
        // to maintain aspect ratio, so this is small + medium
        height={template ? '576px' : undefined}
        {...rest}
      >
        {children &&
          React.cloneElement(children, {
            mobile,
          })}
      </Box>
      {(code || designer || docs || figma) && (
        <Stack guidingChild="first" anchor="top-right">
          {open && (
            <Box animation="fadeIn">
              <Box
                border="top"
                background="background-contrast"
                pad="medium"
                height={{ max: 'medium' }}
                overflow="auto"
              >
                <Text size="xsmall" color="text">
                  <Syntax>
                    <code ref={codeRef} className="language-jsx">
                      {codeText}
                    </code>
                  </Syntax>
                </Text>
              </Box>
              <Box
                direction="row"
                justify="end"
                border="between"
                gap="medium"
                pad={{ horizontal: 'medium', vertical: 'small' }}
              >
                {figma && <Anchor label="figma" href={figma} target="_blank" />}
                {designer && (
                  <Anchor label="designer" href={designer} target="_blank" />
                )}
                {docs && (
                  <Anchor label="properties" href={docs} target="_blank" />
                )}
              </Box>
            </Box>
          )}
          <Box direction="row" justify="end">
            <Button
              title="More details"
              plain
              hoverIndicator
              onClick={() => setOpen(!open)}
            >
              <Box
                pad={{ vertical: 'xsmall', horizontal: 'small' }}
                direction="row"
                gap="xsmall"
              >
                <Text>{open ? 'less' : 'more'}</Text>
                {open ? <FormUp /> : <FormDown />}
              </Box>
            </Button>
          </Box>
        </Stack>
      )}
      {showLayer && (
        <Keyboard
          onEsc={() => {
            setShowLayer(false);
            setMobile(false);
          }}
        >
          <Layer full animation="fadeIn">
            <Box fill background="background-front">
              <Box direction="row" justify="start">
                <RadioButtonGroup
                  name="radio"
                  direction="row"
                  gap="none"
                  options={['Desktop', 'Mobile']}
                  value={mobile ? 'Mobile' : 'Desktop'}
                  onChange={event => setMobile(event.target.value === 'Mobile')}
                >
                  {(option, { checked, hover }) => {
                    const Icon = option === 'Desktop' ? Desktop : IconMobile;
                    let background;
                    if (checked) background = 'brand';
                    else if (hover) background = 'active-background';
                    else background = undefined;
                    return (
                      <Box
                        background={background}
                        direction="row"
                        pad="small"
                        align="center"
                        gap="small"
                      >
                        <Icon />
                        <Text>{option}</Text>
                      </Box>
                    );
                  }}
                </RadioButtonGroup>
                <Button
                  icon={<Contract />}
                  onClick={() => {
                    setShowLayer(false);
                  }}
                  hoverIndicator
                />
              </Box>
              <Box direction="row" justify="center" fill {...rest}>
                {children &&
                  React.cloneElement(children, {
                    mobile,
                  })}
              </Box>
            </Box>
          </Layer>
        </Keyboard>
      )}
    </Box>
  );
};

Example.propTypes = {
  children: PropTypes.element,
  code: PropTypes.string,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  template: PropTypes.bool,
};
