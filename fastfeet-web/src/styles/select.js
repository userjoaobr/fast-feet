export const customStylesSelectInput = {
  container: (styles) => {
    return {
      ...styles,
      width: '100%',
      marginBottom: 'auto',
    };
  },
  control: (styles) => {
    return {
      ...styles,
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      cursor: 'default',
      borderSpacing: 0,
      borderCollapse: 'separate',
      minHeight: '40px',
      height: '40px',
      outline: 'none',
      overflow: 'hidden',
      position: 'relative',
      fontSize: '14px',
      width: '100%',
      lineHeight: 'normal',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    };
  },
  singleValue: (base) => ({
    ...base,
    color: '#999',
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? '#444' : '#444',
    background: state.isFocused && '#f5f5f5 !important',
  }),
};
