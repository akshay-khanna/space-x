import supertest from 'supertest';
import app from '../app.js';
import * as db from '../db/index.js';
import * as mid from '../middlewares/index.js';

jest.mock('../db/index.js', () => {
    return {
      __esModule: true,   
      ...jest.requireActual('../db/index.js'),
      deleteStaleData : jest.fn(),
      getRecord: jest.fn(),
      pool: jest.fn()
    };
  });

  jest.mock('../middlewares/index.js', () => {
    return {
      __esModule: true,   
      ...jest.requireActual('../middlewares/index.js'),
      setCache: jest.fn() 
    };
  });

  let cacheMock=jest.spyOn(mid,'setCache')


describe("GET /search", () => {
    let server= null;
    let request= null;
    beforeEach(() => {
  
        db.deleteStaleData.mockImplementation(()=>{});
        db.getRecord.mockImplementation(()=>{ return [1,[{ ship_id: 'test' }]] });
        cacheMock.mockImplementation(()=>{})
      });
      
    
      beforeAll(function(done){
        server = app.listen(done)
        request = supertest.agent(server)
      })
    
      afterAll(function(done){
        server.close(done)
      })

    // More things come here
    test("GET /search",  (done) => {
        supertest(app).get("/search").expect(200);
    done()
      })

      test("GET /search with params",  (done) => {
        supertest(app).get("/search").query({ship_id: test}).expect(200);
    done()
      })
  });

