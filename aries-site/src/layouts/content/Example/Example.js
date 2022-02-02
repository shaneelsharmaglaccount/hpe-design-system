import {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Keyboard,
  Layer,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';
import { Contract } from 'grommet-icons';
import { scaled } from '../../../themes/scaled';
import {
  BrowserWrapper,
  Container,
  DoDontContainer,
  ExampleControls,
  ExampleResources,
  FigureWrapper,
  HorizontalExample,
  ResponsiveControls,
  ResponsiveContainer,
} from '.';

export const screens = {
  desktop: 'desktop',
  mobile: 'mobile',
  laptop: 'laptop',
};

export const Example = ({
  background,
  bestPractice,
  caption,
  children,
  code, // github code link used to display code inline
  componentName,
  designer, // link to grommet designer example
  details,
  docs, // link to grommet doc for component
  figma, // link to figma design
  github, // link to github directory
  grommetSource, // link to Grommet component source code
  guidance, // link to Design System site guidance
  height,
  horizontalLayout,
  pad,
  plain, // remove Container from around example
  previewWidth,
  relevantComponents,
  screenContainer, // show example in mock browser
  template, // showing as template causes appropriate aspect ratio
  // show screen size controls by default with screenContainer or template
  showResponsiveControls = !!screenContainer || !!template,
  width,
  ...rest
}) => {
  const [screen, setScreen] = useState(screens.laptop);
  const [fullscreen, setFullscreen] = useState(false);
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const inlineRef = useRef();
  const layerRef = useRef();
  const [mockBrowserRect, setMockBrowserRect] = useState({
    height: null,
    width: null,
  });

  // ensure that when page loads or layer opens/closes that the ref value
  // is not null
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    forceUpdate();
  }, [fullscreen, forceUpdate]);

  // If plain, we remove the Container that creates a padded
  // box with rounded corners around Example content
  let ExampleContainer;
  if (plain) ExampleContainer = Box;
  else if (bestPractice) ExampleContainer = DoDontContainer;
  else ExampleContainer = Container;

  // These props control the styling of the example within the overall example
  // container
  const containerProps = {
    bestPractice,
    caption,
    designer,
    docs,
    figma,
    guidance,
    height,
    horizontalLayout,
    pad,
    plain,
    screenContainer,
    showResponsiveControls,
    template,
  };

  // Affects how the Example can behave/display within the outer container
  // for example, wrapping on a mock browser, etc.s
  let ExampleWrapper;
  // show page layouts inside of mock browser screen to demonstrate
  // how content fills or is restricted at various widths
  if (screenContainer) ExampleWrapper = BrowserWrapper;
  // Wrap content in container that can mock "small" width to demonstrate
  // responsive layout
  else if (showResponsiveControls) ExampleWrapper = ResponsiveContainer;
  else ExampleWrapper = Box;

  // Keep track of mock browser dimensions to calculate current breakpoint
  useLayoutEffect(() => {
    const updateSize = () => {
      setMockBrowserRect({
        height: inlineRef.current?.getBoundingClientRect().height,
        width: inlineRef.current?.getBoundingClientRect().width,
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  let viewPort;
  let scaledTheme;

  if (screen === screens.mobile) viewPort = 'small';
  else if (!screenContainer && !showResponsiveControls) viewPort = size;
  else if (screenContainer) {
    if (fullscreen) viewPort = size;
    else if (!fullscreen) {
      const containerWidth = mockBrowserRect.width;
      scaledTheme = screenContainer.scale
        ? scaled(screenContainer.scale)
        : theme;
      const { breakpoints } = scaledTheme.global;
      let breakpoint;
      Object.entries(breakpoints)
        .sort((a, b) => {
          if (a[1].value < b[1].value) return -1;
          if (a[1].value > b[1].value) return 1;
          return 0;
        })
        .forEach(obj => {
          if (!breakpoint) [breakpoint] = obj;
          if (
            containerWidth > breakpoints[breakpoint].value &&
            (containerWidth < obj[1].value || !obj[1].value)
          ) {
            [breakpoint] = obj;
          }
        });
      viewPort = breakpoint;
    }
  } else viewPort = undefined;

  // when Layer is open, we remove the inline Example to avoid
  // repeat id tags that may impede interactivity of inputs
  let content = !fullscreen && (
    <ExampleContainer as="section" {...containerProps}>
      <ExampleWrapper
        background={
          ExampleWrapper === ResponsiveContainer && background
            ? background
            : undefined
        }
        screen={screen}
        width={width}
        ref={inlineRef}
      >
        <ThemeContext.Extend value={scaledTheme || theme}>
          <ResponsiveContext.Provider value={viewPort}>
            {cloneElement(children, {
              containerRef: inlineRef,
              designSystemDemo: fullscreen,
            })}
          </ResponsiveContext.Provider>
        </ThemeContext.Extend>
      </ExampleWrapper>
    </ExampleContainer>
  );

  const exampleControls = (designer ||
    docs ||
    figma ||
    guidance ||
    screenContainer ||
    template) && (
    <ExampleControls
      componentName={componentName}
      designer={designer}
      docs={docs}
      figma={figma}
      grommetSource={grommetSource}
      guidance={guidance}
      horizontalLayout={horizontalLayout}
      setFullscreen={value => setFullscreen(value)}
      showResponsiveControls={showResponsiveControls}
    />
  );

  if (!horizontalLayout)
    content = (
      <>
        {content}
        {exampleControls}
      </>
    );

  if (caption)
    content = <FigureWrapper caption={caption}>{content}</FigureWrapper>;

  const resources = (
    <ExampleResources
      caption={caption}
      code={code}
      github={github}
      details={details}
      margin={showResponsiveControls ? { top: 'xsmall' } : undefined}
      horizontalLayout={horizontalLayout}
      relevantComponents={relevantComponents}
    />
  );

  return (
    <>
      <Box
        width={previewWidth || undefined}
        margin={{ vertical: 'small' }}
        gap="large"
      >
        <>
          {/* For use with templates or page layouts to toggle between laptop,
           ** desktop, and mobile views */}
          {showResponsiveControls && (
            <ResponsiveControls
              controls={showResponsiveControls}
              onSetScreen={setScreen}
              screen={screen}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
            />
          )}
          {horizontalLayout ? (
            <HorizontalExample
              content={content}
              controls={exampleControls}
              height={height}
              plain={plain}
              resources={resources}
              showResponsiveControls={showResponsiveControls}
              width={width}
            />
          ) : (
            <>
              {content}
              {resources}
            </>
          )}
        </>
      </Box>
      {fullscreen && (
        <Keyboard
          onEsc={() => {
            setFullscreen(false);
            setScreen(screens.laptop);
          }}
        >
          <Layer full>
            <Box fill background="background">
              <Box
                direction="row"
                justify={
                  template || screenContainer || showResponsiveControls
                    ? 'between'
                    : 'end'
                }
                pad="xxsmall"
                background="#111"
              >
                {(template || screenContainer || showResponsiveControls) && (
                  <ResponsiveControls
                    controls={showResponsiveControls}
                    onSetScreen={setScreen}
                    screen={screen}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                  />
                )}
                <Button
                  tip="Leave Fullscreen"
                  icon={<Contract />}
                  onClick={() => {
                    setFullscreen(false);
                    setScreen(screens.laptop);
                  }}
                  hoverIndicator
                />
              </Box>
              <Box
                animation={{
                  type: 'fadeIn',
                  delay: 200,
                  duration: 800,
                }}
                background={
                  ExampleWrapper === ResponsiveContainer && background
                    ? background
                    : undefined
                }
                direction="row"
                justify="center"
                align={!template && !screenContainer ? 'center' : undefined}
                flex
                overflow="auto"
                {...rest}
              >
                {screenContainer || showResponsiveControls ? (
                  <Box
                    // for purpose of inline scroll behavior on templates
                    // this id is needed to reference the scroll parent
                    id="layer-wrapper"
                    width={screen === screens.mobile ? 'medium' : '100%'}
                    ref={layerRef}
                  >
                    <ResponsiveContext.Provider value={viewPort}>
                      {cloneElement(children, {
                        containerRef: layerRef,
                        designSystemDemo: fullscreen,
                      })}
                    </ResponsiveContext.Provider>
                  </Box>
                ) : (
                  <ResponsiveContext.Provider value={viewPort}>
                    {children}
                  </ResponsiveContext.Provider>
                )}
              </Box>
            </Box>
          </Layer>
        </Keyboard>
      )}
    </>
  );
};

Example.propTypes = {
  background: PropTypes.string,
  bestPractice: PropTypes.shape({
    type: PropTypes.oneOf(['do', 'dont']).isRequired,
    message: PropTypes.string,
  }),
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.element,
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  componentName: PropTypes.string,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  details: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  github: PropTypes.string,
  grommetSource: PropTypes.string,
  guidance: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalLayout: PropTypes.bool,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  plain: PropTypes.bool,
  previewWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
  screenContainer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ scale: PropTypes.number }),
  ]),
  showResponsiveControls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]),
  template: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
