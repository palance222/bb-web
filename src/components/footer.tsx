export default function Footer() {
  const styledFooter = {
    width:'100%',
    display:'flex',
    flexDirecion:'row',
    position:'fixed',
    bottom:'0',
    backgroundColor: '#01403c',
    color: '#fff'
  }
  return (
    <footer style={styledFooter}>
      <p>Author: Bayanihan Bank</p>
      <p>
        <a href="mailto:.com">hege@example.com</a>
      </p>
    </footer>
  );
}


