import { StyleSheet } from 'react-native'; // Importa o módulo StyleSheet do React Native

// Define os estilos para a tela de login
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#e0e0e0', // Cor de fundo cinza claro
    alignItems: 'center', // Alinha os itens horizontalmente ao centro
    justifyContent: 'center', // Alinha os itens verticalmente ao centro
    padding: 20, // Espaçamento interno
  },
  header: {
    marginBottom: 40, // Margem inferior
    alignItems: 'center', // Alinha os itens horizontalmente ao centro
  },
  title: {
    fontSize: 24, // Tamanho da fonte
    fontWeight: 'bold', // Peso da fonte
    color: '#556B2F', // Cor do texto verde musgo
  },
  form: {
    width: '100%', // Largura de 100% do contêiner pai
  },
  input: {
    width: '100%', // Largura de 100% do contêiner pai
    height: 50, // Altura do campo de entrada
    borderColor: '#ccc', // Cor da borda
    borderWidth: 1, // Largura da borda
    borderRadius: 8, // Bordas arredondadas
    paddingHorizontal: 10, // Espaçamento interno horizontal
    marginBottom: 20, // Margem inferior
    backgroundColor: '#fff', // Cor de fundo branca
  },
  button: {
    backgroundColor: '#556B2F', // Cor de fundo verde musgo
    padding: 15, // Espaçamento interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Alinha o texto ao centro
    marginBottom: 10, // Margem inferior
  },
  buttonText: {
    color: '#fff', // Cor do texto branca
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Peso da fonte
  },
  forgotPassword: {
    color: '#556B2F', // Cor do texto verde musgo
    textAlign: 'center', // Alinha o texto ao centro
    marginVertical: 10, // Margem vertical
  },
  createAccount: {
    color: '#556B2F', // Cor do texto verde musgo
    textAlign: 'center', // Alinha o texto ao centro
    marginVertical: 10, // Margem vertical
  },
  error: {
    color: 'red', // Cor do texto vermelha
    marginBottom: 12, // Margem inferior
    textAlign: 'center', // Alinha o texto ao centro
  },
});

export default styles; // Exporta os estilos para serem utilizados na tela de login
