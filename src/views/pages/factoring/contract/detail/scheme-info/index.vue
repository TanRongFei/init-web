<template>
  <div class="basic-info">
    <head-title :label="'方案信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <div class="wrap">
        <el-form  ref="form" :model="form" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="融资申请金额">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="服务费率">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.name"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="融资成数">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.name"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="保理融资利率">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.name"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="资金来源">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="年罚息率">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="保证金">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="宽限期/年利率">
                    <el-input v-model="form.name">
                      <template slot="append">天</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.name">
                    <template slot="append">%</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="项目周期">
                    <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="form.date"
                    style="width: 100%;"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="担保金额">
                    <el-input v-model="form.name">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.name"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="确权方式">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="回款方式">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-checkbox v-model="form.checked">保证金是否作扣</el-checkbox>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="保理首付款使用费支付方式">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="宽限期使用费支付方式">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="融资用途">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="还款方式">
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button>!</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <form-label :label="'计算结果'" />
      <div class="form-wrap">
        <div class="item">
          <span class="label">本息总额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">手续费总额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">IRR</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">XIRR</span>
          <span></span>
        </div>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="还款计划" name="1"></el-tab-pane>
        <el-tab-pane label="方案分析" name="2"></el-tab-pane>
      </el-tabs>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="期数" width="180" align="center" />
        <el-table-column prop="address" label="还款日" align="center" />
        <el-table-column prop="address" label="应收金额" align="center" />
        <el-table-column prop="address" label="本金" align="center" />
        <el-table-column prop="address" label="手续费" align="center" />
        <el-table-column prop="address" label="剩余本金" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'SchemeInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      tableData: [],
      activeName: '1',
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap{
  display: flex;
  margin-bottom: 20px;
  .item{
    flex: 0 0 25%;
  }
}
</style>
