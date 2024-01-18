import { AppContext } from 'context/quick-compiler/AppContext';
import { useContext } from 'react';
import Navbar from './Navbar';
import OutputDisplay from './OutputDisplay';
import ShareModal from './ShareModal';
import SubNav from './SubNav';
import TextEditor from './TextEditor';
import Split from 'react-split';

export default function QuickCompilerRoot() {
  const { shareModalShow, setShareModalShow } = useContext(AppContext);

  return (
    <div className="flex min-h-screen flex-col bg-mainBg">
      <Navbar />
      <SubNav />
      <main className="flex flex-1">
        <Split
          sizes={[65, 35]}
          minSize={350}
          style={{
            height: 'inherit',
            display: 'flex',
          }}
          gutterSize={8}
          className="flex-1 flex-col lg:flex-row"
        >
          <TextEditor />
          <OutputDisplay />
        </Split>
      </main>
      <ShareModal shareModalShow={shareModalShow} setShareModalShow={setShareModalShow} />
    </div>
  );
}
