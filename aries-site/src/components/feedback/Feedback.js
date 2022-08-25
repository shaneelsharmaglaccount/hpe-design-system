import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  Heading,
  Layer,
  Text,
  ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const Feedback = ({
  children,
  modal,
  onChange,
  onClose,
  onEsc,
  onSubmit,
  show,
  title,
  value,
  isSucessful,
}) => {
  const size = useContext(ResponsiveContext);

  let content = (
    <Box
      fill="vertical"
      overflow="auto"
      width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad="medium"
      flex={false}
    >
      <Identifier onClick={onClose} title={title} modal={modal} />
      <Box gap="medium" margin={{ vertical: 'small' }}>
        <Form
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          method="post"
          validate="submit"
        >
          {children}
          <>
            {isSucessful !== true ? (
              <Box
                margin={{ top: 'medium', bottom: 'small' }}
                justify="end"
                gap="medium"
                direction="row"
              >
                <Button onClick={onClose} label="Cancel" />
                <Button
                  onSubmit={onSubmit}
                  label="Submit"
                  primary
                  type="submit"
                />
              </Box>
            ) : (
              <Box align="end" margin={{ top: 'medium', bottom: 'small' }}>
                <Text alignSelf="end" weight="bold">
                  Thank You!
                </Text>
              </Box>
            )}
          </>
        </Form>
      </Box>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        position={
          !['xsmall', 'small'].includes(size) ? 'bottom-right' : 'center'
        }
        modal={false}
        onEsc={onEsc}
      >
        {content}
      </Layer>
    );

  return content;
};

const Identifier = ({ onClick, title, modal }) => (
  <Box>
    <Box align="center" direction="row" justify="between">
      <Heading level={4} size="small" margin={{ vertical: 'none' }}>
        {title}
      </Heading>
      {modal && (
        <Box justify="center">
          <Button onClick={onClick} icon={<FormClose />} />
        </Box>
      )}
    </Box>
  </Box>
);

Identifier.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Feedback.propTypes = {
  modal: PropTypes.bool,
  onChange: PropTypes.func,
  onClickOutside: PropTypes.func,
  onEsc: PropTypes.func,
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};
