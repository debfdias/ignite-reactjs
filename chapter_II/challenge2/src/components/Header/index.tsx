import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';

interface HeaderProps {
  openModal: () => void
}

function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <header>
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
};

export default Header;