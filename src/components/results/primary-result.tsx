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
    padding: 10,
    fontFamily: 'Helvetica',
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
  PrimaryResultProps,
  | 'english'
  | 'hindi'
  | 'maths'
  | 'science'
  | 'sst'
  | 'computer'
  | 'gk'
  | 'valueedu'
  | 'sanskrit'
>;

const subjects: { key: SubjectKey; name: string }[] = [
  { key: 'english', name: 'English' },
  { key: 'hindi', name: 'Hindi' },
  { key: 'maths', name: 'Mathematics' },
  { key: 'science', name: 'Science' },
  { key: 'sst', name: 'Soc. Science' },
  { key: 'computer', name: 'Computer' },
  { key: 'gk', name: 'G.K.' },
  { key: 'valueedu', name: 'Value Edu.' },
  { key: 'sanskrit', name: 'Sanskrit' },
];

interface Marks {
  pa1: number;
  pf1: number;
  sea1: number;
  term1: number;
  total1: number;
  pa2: number;
  pf2: number;
  sea2: number;
  term2: number;
  total2: number;
  grandTotal: number;
  grade: string;
}

export interface PrimaryResultProps {
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
  computer: Marks;
  gk: Marks;
  valueedu: Marks;
  sanskrit: Marks;
  maxMarks: number;
  marksObtained: number;
  percentage: string;
  overallGrade: string;
  rank: string;
}

const PrimaryResult: React.FC<{ data: PrimaryResultProps[] }> = ({ data }) => {
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
            <View style={{ borderRight: 1, padding: 2, width: '15%' }}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>
                Scholastic Areas
              </Text>
            </View>
            <View style={{ borderRight: 1, padding: 2, width: '35%' }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                Term - 1 (100 Marks)
              </Text>
            </View>
            <View style={{ borderRight: 1, padding: 2, width: '35%' }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                Term - 2 (100 Marks)
              </Text>
            </View>
            <View style={{ padding: 2, width: '15%' }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                Grand Total
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderRight: 1,
              borderLeft: 1,
            }}
          >
            <View style={{ borderRight: 1, padding: 2, width: '15%' }}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>Subjects</Text>
            </View>

            <View
              style={{
                borderRight: 1,
                width: '35%',
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
                P.A.(10)
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
                P.F.(5)
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
                S.E.A.(5)
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
                T-1(80)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Total
              </Text>
            </View>

            <View
              style={{
                borderRight: 1,
                width: '35%',
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
                P.A.(10)
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
                P.F.(5)
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
                S.E.A.(5)
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
                T-2(80)
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  flex: 1,
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Total
              </Text>
            </View>

            <View style={{ width: '15%' }}>
              <View>
                <Text
                  style={{ fontSize: 7, borderBottom: 1, textAlign: 'center' }}
                >
                  Term 1 (50) + Term 2 (50)
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
                    fontSize: 7,
                    width: '50%',
                    borderRight: 1,
                    textAlign: 'center',
                  }}
                >
                  Total-100
                </Text>
                <Text
                  style={{ fontSize: 7, width: '50%', textAlign: 'center' }}
                >
                  Grade
                </Text>
              </View>
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
                <View style={{ borderRight: 1, padding: 2, width: '15%' }}>
                  <Text style={{ fontSize: 10, paddingLeft: 5 }}>
                    {subject.name}
                  </Text>
                </View>

                <View
                  style={{
                    borderRight: 1,
                    width: '35%',
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
                    {result[subjectKey].pa1}
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
                    {result[subjectKey].pf1}
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
                    {result[subjectKey].sea1}
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
                    {result[subjectKey].term1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].total1}
                  </Text>
                </View>

                <View
                  style={{
                    borderRight: 1,
                    width: '35%',
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
                    {result[subjectKey].pa2}
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
                    {result[subjectKey].pf2}
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
                    {result[subjectKey].grade}
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
                    {result[subjectKey].term2}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      flex: 1,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    {result[subjectKey].total2}
                  </Text>
                </View>

                <View
                  style={{
                    width: '15%',
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
              border: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '50%',
                borderRight: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ fontSize: 10 }}>Co-Scholastic Areas</Text>
                <Text style={{ fontSize: 10 }}>
                  [on a 3-point (A-C) grading scale]
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 10 }}>T1</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 10 }}>T2</Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ fontSize: 10 }}>Discipline</Text>
                <Text style={{ fontSize: 10 }}>
                  [on a 3-point (A-C) grading scale]
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 10 }}>T1</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 10 }}>T2</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRight: 1,
              borderBottom: 1,
              borderLeft: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '50%',
                borderRight: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>
                  Work Education (or Pre-vocational Education)
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>General Awareness</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              borderRight: 1,
              borderBottom: 1,
              borderLeft: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '50%',
                borderRight: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>Art Education</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>Regularity and Punctuality</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              borderRight: 1,
              borderBottom: 1,
              borderLeft: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '50%',
                borderRight: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>
                  Health and Physical Education
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '80%',
                  borderRight: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ fontSize: 10 }}>Sincerity</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  borderRight: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
              <View
                style={{
                  width: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></View>
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
                  ['A', '3'],
                  ['B', '2'],
                  ['C', '1'],
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

export default PrimaryResult;
