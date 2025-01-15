import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 10,
  },
});

Font.register({
  family: 'RobotoBold',
  src: '/fonts/Roboto/Roboto-Black.ttf',
});

Font.register({
  family: 'RobotoSemiBold',
  src: '/fonts/Roboto/Roboto-Bold.ttf',
});

type SubjectKey = keyof Pick<
  SecondaryResultProps,
  'english' | 'hindi' | 'maths' | 'science' | 'sst'
>;

const subjects: { key: SubjectKey; name: string }[] = [
  { key: 'english', name: 'English (189)' },
  { key: 'hindi', name: 'Hindi (002)' },
  { key: 'maths', name: 'Mathematics (041)' },
  { key: 'science', name: 'Science (086)' },
  { key: 'sst', name: 'Soc. Science (087)' },
];

interface Marks {
  ppt1: number;
  ppt2: number;
  ppt3: number;
  avgppt: number;
  multassm: number;
  pf: number;
  sea: number;
  totalabc: number;
  annex: number;
  grandTotal: number;
  grade: string;
}

interface IT {
  practical: number;
  viva: number;
  project: number;
  portfolio: number;
  annexam: number;
  total: number;
  grade: string;
}

export interface SecondaryResultProps {
  name: string;
  admNo: string;
  serNo: string;
  grade: string;
  section: string;
  session: string;
  english: Marks;
  hindi: Marks;
  maths: Marks;
  science: Marks;
  sst: Marks;
  informationTechnology: IT;
  maxMarks: number;
  marksObtained: number;
  percentage: string;
  overallGrade: string;
  rank: string;
}

const SecondaryResult: React.FC<{ data: SecondaryResultProps[] }> = ({
  data,
}) => {
  return (
    <Document>
      {data.map((result, index) => (
        <Page key={index} break size="A4" style={styles.page}>
          <View
            style={{
              border: 1,
              height: 58,
              width: '100%',
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Image style={{ width: 60, height: 50 }} src="/logo-color.jpg" />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 19,
                  letterSpacing: 1.1,
                  fontFamily: 'RobotoBold',
                }}
              >
                AKSHAR VIDYA GRIHA
              </Text>
              <Text style={{ fontSize: 10 }}>
                Dardha, Goh, Aurangabad - 824203 (Bihar)
              </Text>
              <Text style={{ fontSize: 10 }}>
                {' '}
                Affiliated to CBSE, New Delhi upto Senior Secondary Level (10+2)
              </Text>
              <Text style={{ fontSize: 10 }}>
                Aff. No. 330608, School No. - 65600
              </Text>
            </View>
            <View style={{ backgroundColor: 'white', width: 50, height: 50 }}>
              <Image
                style={{ width: 50, height: 50 }}
                src={'/cbse-logo-2.jpg'}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10,
              flexDirection: 'row',
              border: 1,
              padding: 5,
            }}
          >
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Name: {result.name}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Adm No.: {result.admNo}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Ser No.: {result.serNo}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Grade: {result.grade}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Section: {result.section}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, fontFamily: 'RobotoSemiBold' }}>
                Session: {result.session}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              border: 1,
            }}
          >
            <View style={{ borderRight: 1, padding: 2, width: '17%' }}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>Subjects</Text>
            </View>

            <View style={{ width: '41.5%' }}>
              <View style={{ padding: 2, borderBottom: 1, borderRight: 1 }}>
                <Text style={{ fontSize: 9, textAlign: 'center' }}>
                  Periodic Assessment (A=10)
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    width: '20%',
                    borderRight: 1,
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  PPT-1 (5)
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '20%',
                    textAlign: 'center',
                    borderRight: 1,
                    padding: 2,
                  }}
                >
                  PPT-2 (5)
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '20%',
                    borderRight: 1,
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  PPT-3 (5)
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '20%',
                    borderRight: 1,
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  Avg of Best 2 PPT (5)
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '20%',
                    borderRight: 1,
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  Multiple Assessment(5)
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '41.5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Portfolio (B=5)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Sub-Enrichment (C=5)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Total (A+B+C =20)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Annual Exam (D=80)
              </Text>
              <Text
                style={{
                  fontSize: 8.1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                  borderRight: 1,
                }}
              >
                Grand Total (100) (A+B+C+ D)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Grade
              </Text>
            </View>
          </View>

          {subjects.map((subject, index) => {
            const subjectKey = subject.key;
            console.log(subjectKey);
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: 1,
                  borderRight: 1,
                  borderLeft: 1,
                }}
              >
                <View style={{ borderRight: 1, padding: 2, width: '17%' }}>
                  <Text style={{ fontSize: 10, paddingLeft: 5 }}>
                    {subject.name}
                  </Text>
                </View>

                <View
                  style={{
                    borderRight: 1,
                    width: '41.5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].ppt1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].ppt2}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].ppt3}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].avgppt}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].multassm}
                  </Text>
                </View>

                <View
                  style={{
                    width: '41.5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].pf}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].sea}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].annex}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].totalabc}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      borderRight: 1,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].grandTotal}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].grade}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              border: 1,
              marginTop: 5,
              marginBottom: 5,
              height: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 10, flex: 1, textAlign: 'center' }}>
              Max Marks: {result.maxMarks}
            </Text>
            <Text style={{ fontSize: 10, flex: 1, textAlign: 'center' }}>
              Marks Obtained: {result.marksObtained}
            </Text>
            <Text style={{ fontSize: 10, flex: 1, textAlign: 'center' }}>
              Percentage: {result.percentage}%
            </Text>
            <Text style={{ fontSize: 10, flex: 1, textAlign: 'center' }}>
              Overall Grade: {result.overallGrade}
            </Text>
            <Text style={{ fontSize: 10, flex: 1, textAlign: 'center' }}>
              Rank: {result.rank}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              border: 1,
            }}
          >
            <View style={{ borderRight: 1, padding: 2, width: '17%' }}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>Subjects</Text>
            </View>

            <View style={{ width: '30%' }}>
              <View style={{ padding: 2, borderBottom: 1, borderRight: 1 }}>
                <Text style={{ fontSize: 9, textAlign: 'center' }}>
                  Practical Actvities (30)
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    width: '50%',
                    borderRight: 1,
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  Practical (20)
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '50%',
                    textAlign: 'center',
                    borderRight: 1,
                    padding: 2,
                  }}
                >
                  Viva (10)
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '53%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Project (10)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Portfolio (10)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Annual Exam (50)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Total (100)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Grade
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRight: 1,
              borderBottom: 1,
              borderLeft: 1,
            }}
          >
            <View style={{ borderRight: 1, padding: 2, width: '17%' }}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>IT (402)</Text>
            </View>

            <View style={{ width: '30%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    width: '50%',
                    borderRight: 1,
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  {result.informationTechnology.practical}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    width: '50%',
                    textAlign: 'center',
                    borderRight: 1,
                    padding: 2,
                  }}
                >
                  {result.informationTechnology.viva}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '53%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                {result.informationTechnology.project}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                {result.informationTechnology.portfolio}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                {result.informationTechnology.annexam}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  borderRight: 1,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                {result.informationTechnology.total}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                {result.informationTechnology.grade}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 5,
              marginTop: 5,
            }}
          >
            <View style={{ border: 1, width: '50%' }}>
              <View
                style={{
                  borderBottom: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Co-Scholastic Areas</Text>
                  <Text style={{ fontSize: 10 }}>
                    [on a 5-point (A-E) grading scale]
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Grade</Text>
                </View>
              </View>

              <View
                style={{
                  borderBottom: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>
                    Work Education (or Pre-Vocational Education)
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}></Text>
                </View>
              </View>
              <View
                style={{
                  borderBottom: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Art Education</Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}></Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>
                    Health & Physical Education
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}></Text>
                </View>
              </View>
            </View>
            <View style={{ border: 1, height: 40, width: '50%' }}>
              <View
                style={{
                  borderBottom: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Element</Text>
                  <Text style={{ fontSize: 10 }}>
                    [on a 5-point (A-E) grading scale]
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Grade</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Discipline</Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}></Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 5, border: 1 }}>
            <Text
              style={{ fontSize: 10, padding: 5, borderRight: 1, width: '21%' }}
            >
              Total Attendance
            </Text>
          </View>
          <View style={{ borderBottom: 1, borderLeft: 1, borderRight: 1 }}>
            <Text
              style={{ fontSize: 10, padding: 5, borderRight: 1, width: '21%' }}
            >
              Total Working Days
            </Text>
          </View>
          <View style={{ marginTop: 5, border: 1 }}>
            <Text
              style={{ fontSize: 10, padding: 5, borderRight: 1, width: '21%' }}
            >
              Class Teacher's Remark
            </Text>
          </View>
          <View style={{ borderBottom: 1, borderLeft: 1, borderRight: 1 }}>
            <Text
              style={{ fontSize: 10, padding: 5, borderRight: 1, width: '21%' }}
            >
              Result
            </Text>
          </View>

          <View
            style={{
              border: 1,
              height: 60,
              marginTop: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              position: 'relative',
              paddingBottom: 2,
            }}
          >
            <Text
              style={{
                position: 'absolute',
                fontSize: 10,
                top: 5,
                left: 5,
                width: '100%',
              }}
            >
              Signature
            </Text>
            <Text style={{ fontSize: 10 }}>Class Teacher</Text>
            <Text style={{ fontSize: 10 }}>Principal</Text>
          </View>
          <View style={{ border: 1, flexDirection: 'column', height: 250 }}>
            {/* Title */}
            <Text
              style={{
                fontSize: 10,
                borderBottom: 1,
                textAlign: 'center',
                padding: 2,
              }}
            >
              Grading System
            </Text>

            {/* Main Content */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 5,
              }}
            >
              {/* Scholastic Areas */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Scholastic Areas:
                </Text>
                <Text
                  style={{ fontSize: 8, textAlign: 'center', marginBottom: 5 }}
                >
                  Grades are awarded on 8 Point Grading scale as follows
                </Text>
                {/* Table */}
                <View
                  style={{
                    flexDirection: 'row',
                    border: 1,
                    width: '80%',
                    margin: 'auto',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      textAlign: 'center',
                      borderRight: 1,
                      padding: 2,
                    }}
                  >
                    MARKS RANGE
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      textAlign: 'center',
                      padding: 2,
                    }}
                  >
                    GRADE
                  </Text>
                </View>
                {/* Data Rows */}
                {[
                  ['91 - 100', 'A 1'],
                  ['81 - 90', 'A 2'],
                  ['71 - 80', 'B 1'],
                  ['61 - 70', 'B 2'],
                  ['51 - 60', 'C 1'],
                  ['41 - 50', 'C 2'],
                  ['33 - 40', 'D'],
                  ['32 & Below', 'E (Needs Improvement)'],
                ].map(([range, grade], index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      borderBottom: 1,
                      borderRight: 1,
                      borderLeft: 1,
                      width: '80%',
                      margin: 'auto',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        flex: 1,
                        textAlign: 'center',
                        borderRight: 1,
                        padding: 2,
                      }}
                    >
                      {range}
                    </Text>
                    <Text
                      style={{
                        fontSize: 8,
                        flex: 1,
                        textAlign: 'center',
                        padding: 2,
                      }}
                    >
                      {grade}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Co-Scholastic Areas:
                </Text>
                <Text
                  style={{ fontSize: 8, textAlign: 'center', marginBottom: 5 }}
                >
                  Grades are awarded on 3 Point Grading scale as follows
                </Text>
                {/* Table */}
                <View
                  style={{
                    flexDirection: 'row',
                    border: 1,
                    width: '80%',
                    marginHorizontal: 'auto',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      textAlign: 'center',
                      borderRight: 1,
                      padding: 2,
                    }}
                  >
                    GRADE
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      textAlign: 'center',
                      padding: 2,
                    }}
                  >
                    GRADE POINT
                  </Text>
                </View>
                {/* Data Rows */}
                {[
                  ['A', '5'],
                  ['B', '4'],
                  ['C', '3'],
                  ['D', '2'],
                  ['E', '1'],
                ].map(([grade, point], index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      borderBottom: 1,
                      borderRight: 1,
                      borderLeft: 1,
                      width: '80%',
                      marginHorizontal: 'auto',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        flex: 1,
                        textAlign: 'center',
                        borderRight: 1,
                        padding: 2,
                      }}
                    >
                      {grade}
                    </Text>
                    <Text
                      style={{
                        fontSize: 8,
                        flex: 1,
                        textAlign: 'center',
                        padding: 2,
                      }}
                    >
                      {point}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 5,
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 10, fontFamily: 'RobotoSemiBold' }}>
                Total : Student has to secure 33% marks out of 20 marks in each
                subject.
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  fontFamily: 'RobotoSemiBold',
                }}
              >
                Annual Exam : Student has to secure 33% marks out of 80 marks in
                each subject.
              </Text>
            </View>
          </View>
        </Page>
      ))}
      ;
    </Document>
  );
};

export default SecondaryResult;
