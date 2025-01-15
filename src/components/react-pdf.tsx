import { PDFViewer } from '@react-pdf/renderer';
import NurseryResult, { NurseryResultProps } from './results/nursery-result';
import PrimaryResult, { PrimaryResultProps } from './results/primary-result';
import SecondaryResult from './results/secondary-result';

const RenderStudentPDFs: React.FC<{
  data: NurseryResultProps[] | PrimaryResultProps[];
  category: string;
}> = ({ data, category }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer className="mt-10 " style={{ width: '100%', height: '100%' }}>
        {category === 'NURSERY' ? (
          // @ts-ignore
          <NurseryResult data={data} />
        ) : category === 'PRIMARY' ? (
          // @ts-ignore
          <PrimaryResult data={data}></PrimaryResult>
        ) : (
          <SecondaryResult data={[]}></SecondaryResult>
        )}
      </PDFViewer>
    </div>
  );
};

export default RenderStudentPDFs;
