'use strict';

import assert from 'assert';
import { expect } from 'chai';
import coMocha from 'co-mocha';
import sinon from 'sinon';
import { DefinitionModel } from 'definition/model/DefinitionModel';
import * as stubs from 'word/stubs/stub';

describe('Definition Model', function () {
  beforeEach(function () {
    this._testData = stubs.createStubWord();
  });

  describe('validation', function () {
    it('should validate correct object', function* () {
      yield DefinitionModel.checkValidity(this._testData);
    });

    it('should fail with invalid tags', function* () {
      try {
        this._testData.meta.tags.push({});
        yield DefinitionModel.checkValidity(this._testData);
        assert.fail('should fail');
      } catch (err) {
        expect(err.errors).to.have.property('meta.tags');
        expect(err.name).to.equal('ValidationError');
      }
    });

    it('should fail with invalid sources', function* () {
      try {
        this._testData.langs = {
          en: {
            spelling: ['scope'],
                    // no definition provided
          },
        };
        yield DefinitionModel.checkValidity(this._testData);
        assert.fail('should fail');
      } catch (err) {
        expect(err.errors).to.have.property('langs.en.definition');
        expect(err.name).to.equal('ValidationError');
      }
    });
  });

  describe('find', function () {
    it('should retrieve existing document', function* () {
      var DefinitionMock = sinon.mock(DefinitionModel);
      var self = this;
      var mockFindResult = {
        exec() {
          return self._testData;
        },
      };
      sinon.stub(DefinitionModel, 'find')
                .withArgs({ 'langs': { 'en': { 'spelling': new RegExp('^scope') } } })
                .returns(mockFindResult);

      var actual = DefinitionModel.findBySpelling('en', 'scope');

      expect(actual.langs.by_narkam.spelling).to.equal('абсяг');
    });
  });
});
