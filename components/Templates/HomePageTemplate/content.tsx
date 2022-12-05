import StyledLink from "@/Atoms/StyledLink";
import styles from "./content.module.scss";

import { GiReceiveMoney, GiPayMoney, GiChart, GiChoice } from "react-icons/gi";
import { FiTarget } from "react-icons/fi";
import { FaChartArea } from "react-icons/fa";
import { BsCalendarPlus } from "react-icons/bs";
import { BiAlarmAdd, BiShow } from "react-icons/bi";

import Image from "next/image";
import { AiOutlineFileAdd, AiOutlineRollback } from "react-icons/ai";

export default function HomePageContent() {
  return (
    <>
      <section className={styles["description"]}>
        <h1>
          The best app to track your cash flow and check investments with
          statistics.
        </h1>
        <p>
          ExpenseApp help you to easly track you expenses, income and
          investments with statistics.
        </p>
        <StyledLink
          variant="contained"
          color="success"
          href="/login"
          size="large"
        >
          Get Started for Free
        </StyledLink>
      </section>
      <section className={styles["includes"]}>
        <h3>What{"'"}s included?</h3>
        <p>
          Everything you need to monitor your cash flow without writing any
          code. Focus on your application, and we will handle statistics.
        </p>
        <ul className={styles["options"]}>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <GiPayMoney />
              </div>
              <div className={styles["content"]}>
                <h5>Expenses tracker</h5>
                <p>Add your expenses and track them in statistics.</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <GiReceiveMoney />
              </div>
              <div className={styles["content"]}>
                <h5>Income tracker</h5>
                <p>Track income, by adding them into app.</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <GiChart />
              </div>
              <div className={styles["content"]}>
                <h5>Investments tracker</h5>
                <p>
                  Add your investments (crypto) and check if you are in the
                  black.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <BsCalendarPlus />
              </div>
              <div className={styles["content"]}>
                <h5>Reminders about the bills</h5>
                <p>
                  Use our calendar to setup your reminders for bills. It will
                  remind you if payment should be payed.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <FiTarget />
              </div>
              <div className={styles["content"]}>
                <h5>Calculator for goals</h5>
                <p>
                  Out calendar for goals help you calculate how much time you
                  need to save specific amount of money.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles["option"]}>
              <div className={styles["icon"]}>
                <FaChartArea />
              </div>
              <div className={styles["content"]}>
                <h5>Statistics</h5>
                <p>
                  Find out how much you spend on specific categories like food,
                  bills, entertainment etc.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section className={styles["how-it-work"]}>
        <h3>How does it work?</h3>
        <div className={styles["functionality"]}>
          <div className={styles["block"]}>
            <h4>Bills Reminder</h4>
            <p>
              Do you want to remember about your bills? Just add it to reminder
            </p>
            <ul>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <BiAlarmAdd />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>1. Setup new reminder</div>
                    <div className={styles["description"]}>
                      You must set a new reminder and configure it.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <BiShow />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>
                      2. Reminder show up if is in past
                    </div>
                    <div className={styles["description"]}>
                      Reminder will inform you, that you have unpayed bills.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <GiChoice />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>
                      3. You can chose between dissmiss or add to expense
                    </div>
                    <div className={styles["description"]}>
                      You will have 2 options. You can dismiss reminder, and he
                      will go to next date if recursive is set, or you add your
                      expense to expenses just by one click.
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles["image"]}>
            <Image
              layout="responsive"
              width="100"
              height="100"
              src="/homepage-1.png"
              alt="x"
            />
          </div>
        </div>
        <div
          className={`${styles["functionality"]} ${styles["functionality--reverse"]}`}
        >
          <div className={styles["block"]}>
            <h4>Investments</h4>
            <p>
              Do you want to know how are your investments? Now you can with
              investments panel.
            </p>
            <ul>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <AiOutlineFileAdd />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>
                      1. Add your investment
                    </div>
                    <div className={styles["description"]}>
                      Set new investment with configuration like value and
                      cryptocurrency.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <GiPayMoney />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>2. Payout investment</div>
                    <div className={styles["description"]}>
                      Payout your investment, when you want sum it into
                      statistics
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles["item"]}>
                  <div className={styles["icon"]}>
                    <AiOutlineRollback />
                  </div>
                  <div className={styles["content"]}>
                    <div className={styles["title"]}>3. Edit Or Rollback</div>
                    <div className={styles["description"]}>
                      After payout you can edit your investment payout value or
                      rollback it to active.
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles["image"]}>
            <Image
              layout="responsive"
              width="100"
              height="100"
              src="/homepage-1.png"
              alt="x"
            />
          </div>
        </div>
      </section>
      <section className={styles["faq"]}>
        <h2>Frequently asked questions</h2>
        <div className={styles["questions"]}>
          <div className={styles["question"]}>
            <h3>Who built ExpensesApp?</h3>
            <p>
              Hi, my name is Tom. I built that site, because I wanted to create
              a programm that have more specific statistics about my money than
              my bank app.
            </p>
          </div>
          <div className={styles["question"]}>
            <h3>How does Cronhub scheduler work?</h3>
            <p>
              With the scheduler, you specify the job schedule and target URL.
              We make an HTTP request to your target URL according to your
              schedule. The schedule can be any time interval or cron
              expression. Of course, you can customize HTTP requests.
            </p>
          </div>
          <div className={styles["question"]}>
            <h3>How does Cronhub monitoring work?</h3>
            <p>
              For each job, you create a monitor and get a unique URL. You use
              this URL to make an HTTP request from your cron job. When you make
              a request, Cronhub knows when your job should run next based on
              the monitor schedule. If your cron job doesn t run on time or runs
              longer than expected, we alert you.
            </p>
          </div>
          <div className={styles["question"]}>
            <h3>How reliable is Cronhub?</h3>
            <p>
              Our monitoring servers are on Digitial Ocean, and schedulers are
              serverless on AWS. I use Cronhub to schedule and monitor my jobs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
